#!/usr/bin/env python3
import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.neighbors import NearestNeighbors
from lime import lime_tabular
from scipy.sparse import csr_matrix
from implicit import lmf


class OULADRecommender:
    def __init__(self):
        self.user_encoder = LabelEncoder()
        self.course_encoder = LabelEncoder()
        self.scaler = StandardScaler()
        
    def load_and_prepare_data(self, base_path):
        """Load and prepare OULAD dataset"""
        # Load relevant CSV files
        students = pd.read_csv(f'{base_path}/studentInfo.csv')
        vle = pd.read_csv(f'{base_path}/studentVle.csv')
        assessments = pd.read_csv(f'{base_path}/studentAssessment.csv')
        courses = pd.read_csv(f'{base_path}/courses.csv')
        
        # Create feature matrix
        df = self._create_feature_matrix(students, vle, assessments, courses)
        
        # Encode categorical variables
        df['student_id_encoded'] = self.user_encoder.fit_transform(df['id_student'])
        df['course_id_encoded'] = self.course_encoder.fit_transform(df['code_module'])
        
        # Create normalized feature matrix for KNN
        feature_columns = [
            'num_of_prev_attempts',
            'studied_credits',
            'total_clicks',
            'assessment_score',
            'days_active'
        ]
        df_scaled = pd.DataFrame(
            self.scaler.fit_transform(df[feature_columns]),
            columns=feature_columns
        )
        
        return df, df_scaled
    
    def _create_feature_matrix(self, students, vle, assessments, courses):
        """Create feature matrix from raw OULAD data"""
        # Aggregate VLE activity
        vle_agg = vle.groupby(['id_student', 'code_module']).agg({
            'sum_click': 'sum',
            'date': 'nunique'
        }).reset_index()
        vle_agg.columns = ['id_student', 'code_module', 'total_clicks', 'days_active']
        
        # Aggregate assessment scores
        assessment_agg = assessments.groupby(['id_student', 'id_assessment']).agg({
            'score': 'mean'
        }).reset_index()
        
        # Merge all data
        df = students.merge(vle_agg, on='id_student', how='left')
        df = df.merge(assessment_agg, on='id_student', how='left')
        df = df.merge(courses, on='code_module', how='left')
        
        # Fill missing values
        df = df.fillna({
            'total_clicks': 0,
            'days_active': 0,
            'score': 0
        })
        
        return df
    
    def train_models(self, df, df_scaled, n_neighbors=5, factors=20):
        """Train both KNN and LMF models"""
        # Train KNN
        self.knn_model = NearestNeighbors(n_neighbors=n_neighbors, metric='cosine')
        self.knn_model.fit(df_scaled)
        
        # Create interaction matrix for LMF
        interaction_matrix = csr_matrix(
            (df['assessment_score'], 
             (df['student_id_encoded'], df['course_id_encoded']))
        )
        
        # Train LMF
        self.lmf_model = lmf.LogisticMatrixFactorization(factors=factors)
        self.lmf_model.fit(interaction_matrix)
        
        return self.knn_model, self.lmf_model
    
    def explain_recommendation(self, user_features, df_scaled):
        """Generate LIME explanation for a recommendation"""
        feature_names = df_scaled.columns.tolist()
        
        explainer = lime_tabular.LimeTabularExplainer(
            df_scaled.values,
            feature_names=feature_names,
            class_names=['Not Recommended', 'Recommended'],
            mode='regression'
        )
        
        exp = explainer.explain_instance(
            user_features,
            lambda x: self.knn_model.kneighbors(x)[0].ravel(),
            num_features=len(feature_names)
        )
        
        return exp
    
    def get_recommendations(self, student_id, df, df_scaled, n_recommendations=5):
        """Get course recommendations for a student"""
        # Get student features
        student_data = df[df['id_student'] == student_id]
        student_encoded_id = self.user_encoder.transform([student_id])[0]
        
        # Get student's scaled features
        student_features = df_scaled[df['id_student'] == student_id].values
        
        # Get KNN recommendations
        _, knn_indices = self.knn_model.kneighbors(student_features)
        
        # Get LMF recommendations
        lmf_scores = self.lmf_model.recommend(
            student_encoded_id,
            interaction_matrix,
            N=n_recommendations
        )
        
        # Prepare recommendations
        knn_recs = df.iloc[knn_indices[0]][['code_module', 'module_presentation']]
        lmf_recs = [(self.course_encoder.inverse_transform([idx])[0], score) 
                    for idx, score in lmf_scores]
        
        # Get explanation
        explanation = self.explain_recommendation(student_features, df_scaled)
        
        return {
            'knn_recommendations': knn_recs.to_dict('records'),
            'lmf_recommendations': lmf_recs,
            'explanation': explanation,
            'student_profile': student_data[['gender', 'region', 'highest_education']].iloc[0].to_dict()
        }

    def evaluate_recommendations(self, df, test_students):
        """Evaluate recommender system performance"""
        results = {
            'mae': [],
            'rmse': [],
            'ndcg': []
        }
        
        for student_id in test_students:
            actual = df[df['id_student'] == student_id]['assessment_score'].values
            predicted = self.get_recommendations(student_id, df, df_scaled)
            
            # Calculate metrics
            results['mae'].append(np.mean(np.abs(actual - predicted)))
            results['rmse'].append(np.sqrt(np.mean((actual - predicted) ** 2)))
            
        return pd.DataFrame(results).mean()