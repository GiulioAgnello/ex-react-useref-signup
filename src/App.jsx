import { useState, useRef } from "react";

export default function App() {
  const nomeRef = useRef();
  const specializzazioneRef = useRef();
  const esperienzaRef = useRef();

  const [form, setForm] = useState({
    username: "",
    password: "",
    descrizione: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};
    const nome = nomeRef.current.value;
    const specializzazione = specializzazioneRef.current.value;
    const esperienza = esperienzaRef.current.value;

    if (!nome.trim()) newErrors.nome = "Il nome completo è obbligatorio.";

    if (!form.username.trim())
      newErrors.username = "Lo username è obbligatorio.";
    for (let char of form.username.trim()) {
      if (
        "0123456789".includes(char) ||
        `!@#$%^&*()-_=+[]{}|;:'\\",.<>?/~`.includes(char)
      ) {
        newErrors.username = "Usa solo caratteri alfabetici e senza spazi.";
        break;
      }
    }
    // Password: almeno 8 caratteri, 1 lettera, 1 numero, 1 simbolo
    if (!form.password.trim()) {
      newErrors.password = "La password è obbligatoria.";
    } else {
      const pwd = form.password;
      const hasLength = pwd.length >= 8;
      const hasLetter = /[a-zA-Z]/.test(pwd);
      const hasNumber = /[0-9]/.test(pwd);
      const hasSymbol = /[!@#$%^&*()\-\_=+\[\]{}|;:'"\\,.<>?/~]/.test(pwd);
      if (!(hasLength && hasLetter && hasNumber && hasSymbol)) {
        newErrors.password =
          "La password deve contenere almeno 8 caratteri, 1 lettera, 1 numero e 1 simbolo.";
      }
    }
    if (!specializzazione)
      newErrors.specializzazione = "Seleziona una specializzazione.";
    if (!esperienza.trim()) {
      newErrors.esperienza = "Inserisci gli anni di esperienza.";
    } else if (isNaN(esperienza) || Number(esperienza) <= 0) {
      newErrors.esperienza = "Inserisci un numero positivo.";
    }
    if (!form.descrizione.trim())
      newErrors.descrizione = "La descrizione è obbligatoria.";
    else if (form.descrizione.length > 1000 || form.descrizione.length < 100) {
      newErrors.descrizione =
        "il testo deve contenere almeno 100 caratte e meno di 1000 senza spazi iniziali e finali";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = {
      nome: nomeRef.current.value,
      username: form.username,
      password: form.password,
      specializzazione: specializzazioneRef.current.value,
      esperienza: esperienzaRef.current.value,
      descrizione: form.descrizione,
    };

    console.log(data);
    alert("Registrazione completata!");
  };

  return (
    <>
      <div className="container mt-4">
        <h1 className="text-center m-5">Registrazione</h1>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-6 mb-4">
              <label htmlFor="nome">Nome Completo</label>
              <input
                type="text"
                className="form-control"
                id="nome"
                name="nome"
                ref={nomeRef}
              />
              {errors.nome && <div className="text-danger">{errors.nome}</div>}
            </div>
            <div className="col-6 mb-4">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
              />
              {errors.username && (
                <div className="text-danger">{errors.username}</div>
              )}
            </div>
            <div className="col-4 mb-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
              {errors.password && (
                <div className="text-danger">{errors.password}</div>
              )}
            </div>
            <div className="col-4 mb-4 mt-4">
              <label htmlFor="specializzazione">Specializzazione</label>
              <select
                id="specializzazione"
                className="form-select"
                name="specializzazione"
                ref={specializzazioneRef}
                defaultValue=""
              >
                <option value="">Seleziona...</option>
                <option value="Full Stack">Full Stack</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
              </select>
              {errors.specializzazione && (
                <div className="text-danger">{errors.specializzazione}</div>
              )}
            </div>
            <div className="col-4 mb-4 mt-4">
              <label htmlFor="esperienza">Anni di esperienza</label>
              <input
                type="number"
                className="form-control"
                id="esperienza"
                name="esperienza"
                ref={esperienzaRef}
                min="1"
              />
              {errors.esperienza && (
                <div className="text-danger">{errors.esperienza}</div>
              )}
            </div>
            <div className="col-12 mb-4">
              <label htmlFor="descrizione">
                Breve descrizione sullo sviluppatore
              </label>
              <textarea
                className="form-control"
                id="descrizione"
                name="descrizione"
                value={form.descrizione}
                onChange={handleChange}
                rows={3}
              />
              {errors.descrizione && (
                <div className="text-danger">{errors.descrizione}</div>
              )}
            </div>
            <div className="col-12 text-center">
              <button type="submit" className="btn btn-primary">
                Registrati
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
