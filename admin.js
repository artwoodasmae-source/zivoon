// ====== CONFIG (بدّلي هاد جوج) ======
const PROJECT_URL = "PUT_YOUR_PROJECT_URL_HERE"; 
const PUBLISHABLE_KEY = "PUT_YOUR_PUBLISHABLE_KEY_HERE"; 
// مثال للـ key: sb_publishable_...

// اختياري: الإيميل اللي مسموح يدخل للأدمين
const ALLOWED_ADMINS = ["artwood.asmae@gmail.com"];

// ====== INIT ======
const sb = window.supabase.createClient(PROJECT_URL, PUBLISHABLE_KEY);

// ====== HELPERS ======
function show(id) { document.getElementById(id).classList.remove("hidden"); }
function hide(id) { document.getElementById(id).classList.add("hidden"); }

function getVal(id) {
  const el = document.getElementById(id);
  return (el?.value || "").trim();
}

// ====== AUTH ======
async function login() {
  try {
    const email = getVal("email");
    const password = document.getElementById("password").value;

    if (!email || !password) return alert("دخل email و password");

    const { data, error } = await sb.auth.signInWithPassword({ email, password });
    if (error) return alert(error.message);

    const userEmail = data?.user?.email || "";
    if (ALLOWED_ADMINS.length && !ALLOWED_ADMINS.includes(userEmail)) {
      await sb.auth.signOut();
      return alert("هاد الحساب ماعندوش صلاحية admin");
    }

    hide("loginBox");
    show("adminBox");
  } catch (e) {
    alert("Login error: " + (e?.message || e));
  }
}

async function logout() {
  await sb.auth.signOut();
  location.reload();
}

// ====== BOOKS ======
async function addBook() {
  try {
    const book = {
      title: getVal("title"),
      author: getVal("author"),
      description: getVal("description"),
      price: Number(getVal("price") || 0)
    };

    if (!book.title) return alert("العنوان ضروري");

    const { error } = await sb.from("books").insert([book]);
    if (error) return alert(error.message);

    alert("Book added ✅");
    ["title", "author", "description", "price"].forEach(id => (document.getElementById(id).value = ""));
  } catch (e) {
    alert("Add error: " + (e?.message || e));
  }
}

// ====== ON LOAD ======
document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("btnLogin").addEventListener("click", login);
  document.getElementById("btnLogout").addEventListener("click", logout);
  document.getElementById("btnAdd").addEventListener("click", addBook);

  // إذا كان user باقي logged in، دخل مباشرة
  const { data } = await sb.auth.getSession();
  if (data?.session?.user?.email) {
    const email = data.session.user.email;
    if (!ALLOWED_ADMINS.length || ALLOWED_ADMINS.includes(email)) {
      hide("loginBox");
      show("adminBox");
    }
  }
});
