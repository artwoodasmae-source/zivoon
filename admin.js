const SUPABASE_URL = "https://kmheqgtavgmijyzvbrsj.supabase.co";
const SUPABASE_KEY = "sb_publishable_RFjLKP-h82e0RGP2GUACg_W0I77v68";

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// LOGIN
document.getElementById("btnLogin").onclick = async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const { error } = await sb.auth.signInWithPassword({ email, password });

  if (error) {
    alert(error.message);
    return;
  }

  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("adminBox").classList.remove("hidden");
};

// LOGOUT
document.getElementById("btnLogout").onclick = async () => {
  await sb.auth.signOut();
  location.reload();
};

// ADD BOOK
document.getElementById("btnAdd").onclick = async () => {
  const book = {
    title: document.getElementById("title").value.trim(),
    author: document.getElementById("author").value.trim(),
    description: document.getElementById("description").value.trim(),
    price: Number(document.getElementById("price").value || 0),
  };

  const { error } = await sb.from("books").insert([book]);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Book added ✅");
};
