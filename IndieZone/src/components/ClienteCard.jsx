function ClienteCard({ cliente }) {
  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h5 className="card-title text-primary">{cliente.nombre}</h5>
        <p className="card-text mb-1">
          <span className="badge bg-secondary">RUC: {cliente.ruc}</span>
        </p>
        <p className="card-text mb-1"><small>📧 {cliente.email}</small></p>
        <p className="card-text"><small>📞 {cliente.telefono}</small></p>
      </div>
      <div className="card-footer text-muted">
        <small>ID: {cliente.id}</small>
      </div>
    </div>
  )
}

export default ClienteCard