-- Create tables for the application

-- Enable RLS
alter table auth.users enable row level security;

-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  dietary_preferences jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create food_scans table
create table public.food_scans (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  product_name text not null,
  barcode text,
  ingredients text[],
  nutritional_info jsonb,
  health_score integer,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create food_analysis table
create table public.food_analysis (
  id uuid default uuid_generate_v4() primary key,
  scan_id uuid references public.food_scans(id) on delete cascade not null,
  analysis_result jsonb not null,
  warnings text[],
  recommendations text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create user_preferences table
create table public.user_preferences (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  allergies text[],
  dietary_restrictions text[],
  health_goals text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS policies

-- Profiles policies
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Food scans policies
create policy "Food scans are viewable by owner."
  on food_scans for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own food scans."
  on food_scans for insert
  with check ( auth.uid() = user_id );

create policy "Users can update own food scans."
  on food_scans for update
  using ( auth.uid() = user_id );

-- Food analysis policies
create policy "Food analysis viewable by scan owner."
  on food_analysis for select
  using ( auth.uid() = (
    select user_id from food_scans where id = food_analysis.scan_id
  ));

create policy "Food analysis insertable by scan owner."
  on food_analysis for insert
  with check ( auth.uid() = (
    select user_id from food_scans where id = scan_id
  ));

-- User preferences policies
create policy "User preferences viewable by owner."
  on user_preferences for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own preferences."
  on user_preferences for insert
  with check ( auth.uid() = user_id );

create policy "Users can update own preferences."
  on user_preferences for update
  using ( auth.uid() = user_id );

-- Create storage buckets
insert into storage.buckets (id, name)
values ('avatars', 'avatars'),
       ('food-images', 'food-images');

-- Storage policies for avatars
create policy "Avatar images are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'avatars' );

create policy "Anyone can upload an avatar."
  on storage.objects for insert
  with check ( bucket_id = 'avatars' );

-- Storage policies for food images
create policy "Food images are accessible by owner."
  on storage.objects for select
  using ( bucket_id = 'food-images' AND auth.uid() = owner );

create policy "Users can upload food images."
  on storage.objects for insert
  with check ( bucket_id = 'food-images' AND auth.uid() = owner );