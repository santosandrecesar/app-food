export type Profile = {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  dietary_preferences?: {
    vegetarian?: boolean;
    vegan?: boolean;
    gluten_free?: boolean;
    [key: string]: boolean | undefined;
  };
  created_at: string;
  updated_at: string;
};

export type FoodScan = {
  id: string;
  user_id: string;
  product_name: string;
  barcode?: string;
  ingredients: string[];
  nutritional_info: {
    calories?: number;
    protein?: number;
    carbohydrates?: number;
    fat?: number;
    [key: string]: number | undefined;
  };
  health_score: number;
  image_url?: string;
  created_at: string;
};

export type FoodAnalysis = {
  id: string;
  scan_id: string;
  analysis_result: {
    score: number;
    categories: string[];
    ingredients_analysis: {
      name: string;
      category: string;
      concerns?: string[];
    }[];
    [key: string]: any;
  };
  warnings: string[];
  recommendations: string[];
  created_at: string;
};

export type UserPreferences = {
  id: string;
  user_id: string;
  allergies: string[];
  dietary_restrictions: string[];
  health_goals: string[];
  created_at: string;
  updated_at: string;
};