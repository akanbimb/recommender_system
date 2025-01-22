#!/usr/bin/env python3
"""program entry point"""
from recommender import OULADRecommender


recommender = OULADRecommender()
df, df_scaled = recommender.load_and_prepare_data('student_data')
knn_model, lmf_model = recommender.train_models(df, df_scaled)

recommendations = recommender.get_recommendations('student_1', df, df_scaled)