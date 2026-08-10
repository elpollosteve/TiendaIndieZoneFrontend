import { useState } from 'react'
import ClienteCard from './components/ClienteCard'

const clientesIniciales = [
  { id: 1, nombre: 'Ana García',  ruc: '20111222333', email: 'ana@mail.com',   telefono: '999888777' },
  { id: 2, nombre: 'Luis Torres', ruc: '20444555666', email: 'luis@mail.com',  telefono: '988777666' },
  { id: 3, nombre: 'María Rodas', ruc: '20777888999', email: 'maria@mail.com', telefono: '977666555' },
]

function App() {
  const [clientes, setClientes] = useState(clientesIniciales)

  return (
    <div className="container mt-4">
      <h1 className="text-primary mb-1">GestioPro</h1>
      <p className="text-muted mb-4">Sistema de Gestión · Semana 11</p>
      <h4 className="mb-3">
        Clientes
        <span className="badge bg-primary ms-2">{clientes.length}</span>
      </h4>
      <div className="row">
        {clientes.map(cliente => (
          <div className="col-md-4 mb-3" key={cliente.id}>
            <ClienteCard cliente={cliente} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default App