/* =============================
   SUPABASE CONFIG
============================= */

const SUPABASE_URL = "https://kmheggtavgmijyzvbrsj.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_RFjLkP-h82e0RGP2GUAcdg_WOI77v68"; // 

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* =============================
   AUTH FUNCTIONS
============================= */

async function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

 if (email !== "artwood.asmae@gmail.com" || password !== "ZIVOON-ADMIN-2025") {
  alert("إيميل أو كلمة السر غير صحيحة");
  return;
}

  const { data, error } = await sb.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("adminBox").classList.remove("hidden");
}

async function logout() {
  await sb.auth.signOut();
  location.reload();
}

/* =============================
   ADD BOOK
============================= */

async function addBook() {
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const description = document.getElementById("description").value.trim();
  const price = Number(document.getElementById("price").value || 0);

  if (!title) {
    alert("Morning Rituals for a Better Life");
    return;
  }

  const { error } = await sb.from("books").insert([
    {
      title,
      author,
      description,
      price,
    },
  ]);

  if (error) {
    alert(error.message);
    return;
  }

  alert("📚 Book added successfully");

  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("description").value = "";
  document.getElementById("price").value = "";
}

/* =============================
   EVENTS (NO onclick)
============================= */

window.addEventListener("DOMContentLoaded", () => {
  const btnLogin = document.getElementById("btnLogin");
  const btnLogout = document.getElementById("btnLogout");
  const btnAdd = document.getElementById("btnAdd");

  if (btnLogin) btnLogin.addEventListener("click", login);
  if (btnLogout) btnLogout.addEventListener("click", logout);
  if (btnAdd) btnAdd.addEventListener("click", addBook);
});
