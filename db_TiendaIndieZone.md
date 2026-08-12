# TiendaIndieZoneFrontend
Base de datos de la tienda IndieZone
Script
-- ============================================================
-- TABLA CLIENTE
-- ============================================================

CREATE TABLE cliente (
    id_cliente SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    dni VARCHAR(8) UNIQUE NOT NULL,
    correo VARCHAR(100) NOT NULL,
    telefono VARCHAR(15) NOT NULL,
    fecha_registro DATE NOT NULL
);


-- ============================================================
-- TABLA CATEGORIA
-- ============================================================

CREATE TABLE categoria (
    id_categoria SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(150)
);


-- ============================================================
-- TABLA OFERTA
-- ============================================================

CREATE TABLE oferta (
    id_oferta SERIAL PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL,
    porcentaje_descuento NUMERIC(5,2) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL
);


-- ============================================================
-- TABLA PRODUCTO
-- ============================================================

CREATE TABLE producto (
    id_producto SERIAL PRIMARY KEY,
    nombre_producto VARCHAR(100) NOT NULL,
    tipo_producto VARCHAR(30) NOT NULL,
    descripcion_producto VARCHAR(200),
    precio NUMERIC(10,2) NOT NULL,
    stock INTEGER NOT NULL,
    id_categoria INTEGER NOT NULL,
    id_oferta INTEGER,

    FOREIGN KEY (id_categoria)
        REFERENCES categoria(id_categoria),

    FOREIGN KEY (id_oferta)
        REFERENCES oferta(id_oferta)
);


-- ============================================================
-- TABLA VENTA
-- ============================================================

CREATE TABLE venta (
    id_venta SERIAL PRIMARY KEY,
    fecha_venta DATE NOT NULL,
    total_venta NUMERIC(10,2) NOT NULL,
    id_cliente INTEGER NOT NULL,

    FOREIGN KEY (id_cliente)
        REFERENCES cliente(id_cliente)
);


-- ============================================================
-- TABLA DETALLE_VENTA
-- ============================================================

CREATE TABLE detalle_venta (
    id_venta INTEGER NOT NULL,
    id_producto INTEGER NOT NULL,
    cantidad INTEGER NOT NULL,
    precio_unitario NUMERIC(10,2) NOT NULL,
    subtotal NUMERIC(10,2) NOT NULL,

    PRIMARY KEY (id_venta, id_producto),

    FOREIGN KEY (id_venta)
        REFERENCES venta(id_venta),

    FOREIGN KEY (id_producto)
        REFERENCES producto(id_producto)
);



-- ============================================================
-- CLIENTES - 5 REGISTROS
-- ============================================================

INSERT INTO cliente
(nombre, apellido, dni, correo, telefono, fecha_registro)
VALUES
('Carlos', 'Ramirez', '74125836', 'carlos.ramirez@gmail.com', '987654321', '2026-01-05'),
('Andrea', 'Torres', '75236941', 'andrea.torres@gmail.com', '986543210', '2026-01-08'),
('Luis', 'Mendoza', '76321458', 'luis.mendoza@gmail.com', '985432109', '2026-01-15'),
('Valeria', 'Castro', '77412569', 'valeria.castro@gmail.com', '984321098', '2026-01-22'),
('Diego', 'Flores', '78523614', 'diego.flores@gmail.com', '983210987', '2026-02-02');


-- ============================================================
-- CATEGORIAS - 3 REGISTROS
-- ============================================================

INSERT INTO categoria
(nombre, descripcion)
VALUES
('Videojuegos', 'Videojuegos disponibles para diferentes plataformas'),
('Consolas', 'Consolas de videojuegos de diferentes fabricantes'),
('Accesorios', 'Accesorios y complementos para consolas y videojuegos');


-- ============================================================
-- OFERTAS - 2 REGISTROS
-- ============================================================

INSERT INTO oferta
(nombre, porcentaje_descuento, fecha_inicio, fecha_fin)
VALUES
('Oferta Gamer', 10.00, '2026-07-01', '2026-08-31'),
('Festival Indie', 20.00, '2026-08-01', '2026-09-30');


-- ============================================================
-- PRODUCTOS - 5 REGISTROS
-- ============================================================

INSERT INTO producto
(nombre_producto, tipo_producto, descripcion_producto, precio, stock, id_categoria, id_oferta)
VALUES
('Hollow Knight', 'Videojuego', 'Videojuego indie de accion y aventura', 45.00, 30, 1, 2),

('Stardew Valley', 'Videojuego', 'Videojuego indie de simulacion y gestion de granja', 40.00, 25, 1, 2),

('Hades', 'Videojuego', 'Videojuego indie de accion tipo roguelike', 60.00, 20, 1, 1),

('Nintendo Switch OLED', 'Consola', 'Consola Nintendo Switch con pantalla OLED', 1499.00, 10, 2, NULL),

('Control Inalambrico', 'Accesorio', 'Control inalambrico compatible con videojuegos para PC', 120.00, 15, 3, 1);


-- ============================================================
-- VENTAS - 10 REGISTROS
-- ============================================================

INSERT INTO venta
(fecha_venta, total_venta, id_cliente)
VALUES
('2026-07-01', 45.00, 1),
('2026-07-03', 80.00, 2),
('2026-07-07', 60.00, 3),
('2026-07-12', 1499.00, 4),
('2026-07-18', 120.00, 5),
('2026-07-25', 90.00, 1),
('2026-08-01', 120.00, 2),
('2026-08-03', 180.00, 3),
('2026-08-05', 1499.00, 4),
('2026-08-08', 200.00, 5);


-- ============================================================
-- DETALLE_VENTA - 10 REGISTROS
-- ============================================================

INSERT INTO detalle_venta
(id_venta, id_producto, cantidad, precio_unitario, subtotal)
VALUES
(1, 1, 1, 45.00, 45.00),
(2, 2, 2, 40.00, 80.00),
(3, 3, 1, 60.00, 60.00),
(4, 4, 1, 1499.00, 1499.00),
(5, 5, 1, 120.00, 120.00),
(6, 1, 2, 45.00, 90.00),
(7, 2, 3, 40.00, 120.00),
(8, 3, 3, 60.00, 180.00),
(9, 4, 1, 1499.00, 1499.00),
(10, 2, 5, 40.00, 200.00);
