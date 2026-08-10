function Alerta({ tipo, mensaje, cerrar }) {

  if (!mensaje) {
    return null;
  }

  return (
    <div
      className={`alert alert-${tipo} alert-dismissible fade show`}
      role="alert"
    >

      {mensaje}

      <button
        type="button"
        className="btn-close"
        aria-label="Cerrar"
        onClick={cerrar}
      />

    </div>
  );
}

export default Alerta;