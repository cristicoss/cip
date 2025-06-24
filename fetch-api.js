const { createClient } = window.supabase;

// Initialize Supabase client
const supabaseUrl = "https://zffxtqoaghcuwpnslgth.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmZnh0cW9hZ2hjdXdwbnNsZ3RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEzNjM4NzIsImV4cCI6MjAyNjkzOTg3Mn0.PUC3EpGYrLV8ZMKFu428qErvYRV7GtBlf4WfWHJrs-k";

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

const fetchedProjects = async (tableName) => {
  try {
    const { data, error } = await supabase.from(tableName).select("*");

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
};

const insertRow = async (
  tableName,
  retailerName,
  q1,
  q2,
  q3,
  q4,
  q5,
  name,
  email
) => {
  const { data, error } = await supabase.from(tableName).insert([
    {
      retailer: retailerName,
      premiere: q1,
      teilnehmerrekord: q2,
      symbol: q3,
      emotionen: q4,
      streckenrekord: q5,
      name: name,
      email: email,
    },
  ]);

  if (error) {
    console.error(error);
  } else {
    const thankYou = document.querySelector(".post_container");
    const header = document.querySelector(".header_container");
    const imageContainer = document.querySelector(".header-image_container");
    const quizz = document.querySelector(".quiz_container");
    thankYou.classList.remove("hidden");
    header.classList.remove("hidden");
    imageContainer.classList.remove("hidden");
    quizz.classList.remove("hidden");
  }
};

export { fetchedProjects, supabase, insertRow };
