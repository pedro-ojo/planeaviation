# Plane Aviation — Setup do Painel Administrativo

Site estático (HTML/CSS/JS puro) + Firebase (Auth, Firestore, Storage). Hospedável em GitHub Pages, Firebase Hosting ou qualquer servidor estático.

---

## 1. Criar o projeto Firebase

1. Acesse `console.firebase.google.com` → **Adicionar projeto**.
2. **Authentication** → Sign-in method → ative **E-mail/senha**.
3. **Firestore Database** → criar (modo produção).
4. **Storage** → criar. *(opcional para testar — veja a nota abaixo)*
5. **Configurações do projeto → Seus apps → Web** → copie o objeto de config.

## 2. Colar as chaves

Abra `firebase-config.js` e substitua os `PASTE_...` pelas chaves do seu app.
Enquanto estiver com os placeholders, o site público continua funcionando com dados de exemplo e o painel mostra a tela de "configure o Firebase".

> A `apiKey` do Firebase **não é segredo** — ela só identifica o projeto. Quem protege os dados são as **regras de segurança** abaixo. Mesmo assim, restrinja a chave (passo 6).

## 2b. Imagens: testar sem Storage (plano grátis)

O Firebase Storage exige o plano **Blaze** (pago). Para **testar no plano grátis**, o `firebase-config.js` vem com:

```
IMAGE_MODE: "inline"
```

Nesse modo, as imagens são **comprimidas no navegador** (máx. 1280px, JPEG) e guardadas **dentro do próprio Firestore** — sem Storage. Limite prático: ~900 KB por aeronave (use 1–3 fotos). É ótimo para validar o fluxo.

Quando ativar o **Blaze** e criar o Storage, troque para:

```
IMAGE_MODE: "storage"
```

e publique o `storage.rules`. Nada mais muda no código.

> Para produção sem Blaze, a alternativa é o **Cloudinary** (free tier, upload "unsigned") — guarda só a URL no Firestore. Posso adaptar o uploader pra isso quando quiser (você já usou Cloudinary no OJO Scheduler).



- **Firestore → Regras**: cole o conteúdo de `firestore.rules` e publique.
- **Storage → Regras**: cole o conteúdo de `storage.rules` e publique.

Essas regras são onde a autorização realmente acontece:
- `aircraft` e `cirrusFleet`: **qualquer um lê** (o site precisa exibir), mas **só admin/editor escreve**.
- `users`: cada um lê o próprio papel; **só admin** cria/edita/remove papéis.
- Storage: leitura pública das imagens; upload só admin/editor, **apenas imagens, até 8 MB**.

## 4. Criar o primeiro administrador (bootstrap)

As regras impedem que alguém se promova sozinho a admin — então o primeiro é criado na mão, uma única vez:

1. **Authentication → Users → Add user**: crie seu e-mail + senha.
2. Copie o **UID** gerado.
3. **Firestore → Iniciar coleção** `users` → ID do documento = **esse UID** → campos:
   - `email` (string) = seu e-mail
   - `role` (string) = `admin`
4. Abra `admin.html`, faça login. A partir daí você convida o resto da equipe pelo próprio painel.

## 5. Estrutura de dados (referência)

```
aircraft/{id}      à venda (página Aeronaves)
  model, year(number), hours, condition ("Novo"|"Seminovo"),
  location, price, tag, tagSolid(bool),
  images: [url, ...]                       (Storage)
  specs:    [{label, value}, ...]
  features: [{icon, title, desc}, ...]     icon ∈ Shield|Monitor|Navigation|Gauge|Zap|Wind|Award
  createdAt, createdBy, updatedAt, updatedBy

cirrusFleet/{id}   demonstração (Universo Cirrus → Linha de modelos)
  name, label, desc, order(number), image(url)
  specs: [{k, v}, ...]

users/{uid}        papéis
  email, role ("admin"|"editor"), createdAt, createdBy
```

As páginas `aeronaves.html`, `aeronave.html` e `universo-cirrus.html` leem dessas coleções automaticamente quando o Firebase está configurado; senão, usam os dados de exemplo.

## 6. Endurecimento (recomendado antes de entregar)

- **Restringir a API key**: Google Cloud Console → Credenciais → restrinja por domínio (HTTP referrers) ao domínio do cliente.
- **Domínios autorizados**: Authentication → Settings → mantenha só os domínios reais.
- **App Check** (reCAPTCHA): ative para Firestore e Storage — bloqueia uso das suas credenciais fora do seu site.
- **HTTPS sempre**: GitHub Pages e Firebase Hosting já entregam HTTPS.
- **Backups**: ative exportações periódicas do Firestore.
- **Remoção total de usuário (LGPD "direito ao esquecimento")**: remover o papel no painel já revoga todo o acesso de escrita. Apagar *de vez* a credencial de login exige uma **Cloud Function** com Admin SDK (`auth().deleteUser(uid)`) — recomendado para produção. Posso te entregar essa Function quando quiser.

## 7. Notas LGPD

- **Minimização**: o painel só guarda e-mail + papel da equipe. Nenhuma senha é digitada ou armazenada por você (o convidado define a própria via e-mail de redefinição).
- **Formulário de contato do site**: hoje ele não envia nada. Quando for ligar (EmailJS/Firestore), inclua **consentimento explícito** e link para a **política de privacidade**.
- **Transparência/eliminação**: tenha uma política de privacidade publicada e um caminho para o titular pedir acesso/remoção dos dados.
- Isto cobre o lado técnico. **A adequação legal final deve ser revisada por alguém de Direito/DPO** — não substitui orientação jurídica.

## 8. Deploy

**GitHub Pages**: suba a pasta `plane-aviation/` num repositório → Settings → Pages → branch `main`.
**Firebase Hosting**: `firebase init hosting` apontando para esta pasta → `firebase deploy`.

---

### Arquivos
- `index.html`, `aeronaves.html`, `aeronave.html`, `universo-cirrus.html`, `sobre.html`, `servicos.html`, `contato.html`, `configurador.html`, `news.html` — site público
- `admin.html` — painel administrativo
- `styles.css`, `site.js` — design e header/footer compartilhados
- `firebase-config.js` — suas chaves
- `firestore.rules`, `storage.rules` — segurança
