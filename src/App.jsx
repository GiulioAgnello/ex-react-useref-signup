import { useState } from "react";

export default function App() {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = `!@#$%^&*()-_=+[]{}|;:'\\",.<>?/~`;
  const [form, setForm] = useState({
    nome: "",
    username: "",
    password: "",
    specializzazione: "",
    esperienza: "",
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
    if (!form.nome.trim()) newErrors.nome = "Il nome completo è obbligatorio.";

    if (!form.username.trim())
      newErrors.username = "Lo username è obbligatorio.";
    for (let char of form.username.trim()) {
      if (numbers.includes(char) || symbols.includes(char)) {
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
    if (!form.specializzazione)
      newErrors.specializzazione = "Seleziona una specializzazione.";
    if (!form.esperienza.trim()) {
      newErrors.esperienza = "Inserisci gli anni di esperienza.";
    } else if (isNaN(form.esperienza) || Number(form.esperienza) <= 0) {
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

    console.log(form);
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
                value={form.nome}
                onChange={handleChange}
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
                value={form.specializzazione}
                onChange={handleChange}
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
                value={form.esperienza}
                onChange={handleChange}
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
