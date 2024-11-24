import { supabase } from '../supabase/client';
import type { FoodScan } from '../supabase/types';

export const foodScanService = {
  async createScan(userId: string, scanData: Omit<FoodScan, 'id' | 'user_id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('food_scans')
      .insert([{ ...scanData, user_id: userId }])
      .select()
      .single();
    return { data, error };
  },

  async getScansByUser(userId: string) {
    const { data, error } = await supabase
      .from('food_scans')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async getScanById(scanId: string) {
    const { data, error } = await supabase
      .from('food_scans')
      .select('*')
      .eq('id', scanId)
      .single();
    return { data, error };
  },

  async uploadScanImage(scanId: string, file: File) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${scanId}-${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('food-images')
      .upload(filePath, file);

    if (uploadError) {
      return { error: uploadError };
    }

    const { data: { publicUrl } } = supabase.storage
      .from('food-images')
      .getPublicUrl(filePath);

    const { data, error } = await supabase
      .from('food_scans')
      .update({ image_url: publicUrl })
      .eq('id', scanId);

    return { data, error };
  },
};