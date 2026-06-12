/* ============================================================
   firebase-config.js — inicialização compartilhada (Plane Aviation)
   Cole as chaves do SEU projeto Firebase abaixo.
   Console → Configurações do projeto → Seus apps → SDK config.
   ============================================================ */
const firebaseConfig = {
  apiKey:            "PASTE_API_KEY",
  authDomain:        "PASTE_PROJECT.firebaseapp.com",
  projectId:         "PASTE_PROJECT",
  storageBucket:     "PASTE_PROJECT.appspot.com",
  messagingSenderId: "PASTE_SENDER_ID",
  appId:             "PASTE_APP_ID",
};

/* Detecta se ainda está com placeholders (modo demonstração) */
const PA_CONFIGURED = !String(firebaseConfig.apiKey).startsWith("PASTE");

let _auth = null, _db = null, _storage = null;
if (PA_CONFIGURED && typeof firebase !== "undefined") {
  if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
  _auth = firebase.auth();
  _db = firebase.firestore();
  _storage = firebase.storage();
}

/* Namespace global usado por todas as páginas */
window.PA = {
  config: firebaseConfig,
  configured: PA_CONFIGURED,
  auth: _auth,
  db: _db,
  storage: _storage,
  // papéis aceitos
  ROLES: ["admin", "editor"],
  // ícones disponíveis para "Tecnologias a bordo"
  FEATURE_ICONS: ["Shield", "Monitor", "Navigation", "Gauge", "Zap", "Wind", "Award"],
};
