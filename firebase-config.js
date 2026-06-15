/* ============================================================
   firebase-config.js — inicialização compartilhada (Plane Aviation)
   Cole as chaves do SEU projeto Firebase abaixo.
   Console → Configurações do projeto → Seus apps → SDK config.
   ============================================================ */
const firebaseConfig = {
  apiKey:            "AIzaSyDDHBRZfH87ALu9OSbtRhrb8zVlKPkgSgw",
  authDomain:        "planeaviation-3aa6a.firebaseapp.com",
  projectId:         "planeaviation-3aa6a",
  storageBucket:     "planeaviation-3aa6a.firebasestorage.app",
  messagingSenderId: "192540086607",
  appId:             "1:192540086607:web:296c22ba94c4952c79353a",
};

/* Detecta se ainda está com placeholders (modo demonstração) */
const PA_CONFIGURED = !String(firebaseConfig.apiKey).startsWith("PASTE");

let _auth = null, _db = null, _storage = null;
if (PA_CONFIGURED && typeof firebase !== "undefined") {
  if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
  // Auth e Storage só existem se o SDK correspondente foi carregado na página
  _auth    = typeof firebase.auth    === "function" ? firebase.auth()    : null;
  _db      = typeof firebase.firestore === "function" ? firebase.firestore() : null;
  _storage = typeof firebase.storage === "function" ? firebase.storage() : null;
}

/* Namespace global usado por todas as páginas */
window.PA = {
  config: firebaseConfig,
  configured: PA_CONFIGURED,
  auth: _auth,
  db: _db,
  storage: _storage,
  // Onde guardar as imagens das aeronaves:
  //   "inline"  → comprimidas dentro do Firestore (funciona no plano grátis, sem Storage)
  //   "storage" → Firebase Storage (requer plano Blaze; troque para cá depois do upgrade)
  IMAGE_MODE: "inline",
  // papéis aceitos
  ROLES: ["admin", "editor"],
  // ícones disponíveis para "Tecnologias a bordo"
  FEATURE_ICONS: ["Shield", "Monitor", "Navigation", "Gauge", "Zap", "Wind", "Award"],
};
