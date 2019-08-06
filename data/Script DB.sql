create schema `bdrequerimientovehicular` DEFAULT CHARACTER SET utf8;
use bdrequerimientovehicular;

/*Creacion de tablas*/


CREATE TABLE tipo(
	idtipo int unsigned not null auto_increment,
	nombre varchar(80) not null,
	 primary key (idtipo)
)ENGINE=INNODB;

CREATE TABLE unidad(
	idunidad int unsigned not null auto_increment,
	nombre varchar(100) not null,
	ubicacion varchar(12) not null,
	primary key (idunidad)
)ENGINE=INNODB;

CREATE TABLE destino(
	iddestino int unsigned not null auto_increment,
	provincia varchar(45) not null,
	distrito varchar(45) not null,
	primary key (iddestino)
)ENGINE=INNODB;

CREATE TABLE vehiculo(
	idvehiculo int unsigned not null auto_increment,
	clase varchar(40) not null,
	placa varchar(30) not null,
	nroAsientos smallint unsigned default 0,
	capacidadCarga varchar(10) not null,
	idtipo int unsigned not null,
	primary key(idvehiculo),
	foreign key(idtipo) references tipo(idtipo)
)ENGINE=INNODB;


CREATE TABLE trabajador (
	idtrabajador int unsigned not null auto_increment,
	nombres varchar(100) not null,
	sexo varchar(100) not null,
	dni varchar(10) not null unique,
	direccion varchar(100)  null,
	telefono varchar(100)  null,
	email varchar(124) null,
	cargo varchar(50) not null,
	idunidad int unsigned not null,
	primary key (idtrabajador),
	foreign key(idunidad) references unidad(idunidad)
)ENGINE=INNODB;

CREATE TABLE usuario(
	idusuario int unsigned not null auto_increment,
	email varchar(20) not null unique,
	password varchar(100) not null,
	tipo varchar(30) not null,
	habilitado  boolean default false,
	idtrabajador int unsigned not null,

	 primary key (idusuario),
	 foreign key(idtrabajador) references trabajador(idtrabajador)
)ENGINE=INNODB;

CREATE TABLE requerimiento(
	idrequerimiento int unsigned not null auto_increment,
	fecharequerimiento date not null,
	fechaIda date not null,
	fechaRetorno date not null,
	descripcion varchar(500) not null,
	observaciones varchar(200) null,
	aprobado varchar(12) default '',
	ordenServicio varchar (45) not null,
	iddestino int unsigned not null,
	idvehiculo int unsigned not null,
	idusuario int unsigned not null,
	primary key (idrequerimiento),
	foreign key (idvehiculo) references vehiculo(idvehiculo),
	foreign key (idusuario) references usuario(idusuario)
)ENGINE=INNODB;

CREATE TABLE tripulacion(
	idrequerimiento int unsigned not null,
	idtrabajador int unsigned not null,
	primary key (idrequerimiento,idtrabajador),
	foreign key (idrequerimiento) references requerimiento(idrequerimiento),
	foreign key (idtrabajador) references trabajador(idtrabajador)
)ENGINE=INNODB;

/*========== INSERT INTO ==========*/

/* tipo de vehiculo*/
INSERT INTO tipo values(null,'LAND CRUISER PRADO');
INSERT INTO tipo values(null,'CAMIONETA PICKUP');
INSERT INTO tipo values(null,'MINIBUS SPRINTER');
INSERT INTO tipo values(null,'4RUNNER');
INSERT INTO tipo values(null,'CAMIONETA DE CARGA');
INSERT INTO tipo values(null,'CAMIONETA PICKUP 4X4');
INSERT INTO tipo values(null,'---');



INSERT INTO unidad values(null,'CONTABILIDAD','201');
INSERT INTO unidad values(null,'GERENCIA','302');
INSERT INTO unidad values(null,'SUPERVISION','202');
INSERT INTO unidad values(null,'OBRERO','102');



INSERT INTO destino values(null,'ACOMAYO','ACOMAYO');
INSERT INTO destino values(null,'ANTA','ANTA');
INSERT INTO destino values(null,'CALCA','CALCA');
INSERT INTO destino values(null,'CANAS','YANAOCA');
INSERT INTO destino values(null,'CANCHIS','SICUANI');
INSERT INTO destino values(null,'CHUMBIVILCAS','SANTO TOMÁS');
INSERT INTO destino values(null,'CUSCO','CUSCO');
INSERT INTO destino values(null,'ESPINAR','ESPINAR');
INSERT INTO destino values(null,'LA CONVENCION','QUILLABAMBA');
INSERT INTO destino values(null,'PAUCARTAMBO','PAUCARTAMBO');
INSERT INTO destino values(null,'PARURO','PARURO');
INSERT INTO destino values(null,'QUISPICANCHIS','URCOS');
INSERT INTO destino values(null,'URUBUAMBA',' URUBAMBA');



INSERT INTO vehiculo values(null,'CAMIONETA RURAL','EGA042',6,'700 KG',1);
INSERT INTO vehiculo values(null,'CAMIONETA PICKUP','EGE069',4,'400 KG',2);
INSERT INTO vehiculo values(null,'MINIBUS','EGE069',15,'400 KG',3);
INSERT INTO vehiculo values(null,'CAMION BARANDA','SEGUN DISPONIBILIDAD',1,'- KG',7);
INSERT INTO vehiculo values(null,'MOTOCICLETA','SEGUN DISPONIBILIDAD',1,'- KG',7);
INSERT INTO vehiculo values(null,'CUATRIMOTO','SEGUN DISPONIBILIDAD',1,'- KG',7);
INSERT INTO vehiculo values(null,'TRIMOTO','SEGUN DISPONIBILIDAD',1,'- KG',7);


INSERT INTO trabajador VALUES(null,'CLAUDIA HUAMANI JARA','F','43330166','Dirección 2','924864111','claudia@mail.com','ADMINISTRADOR',2);
INSERT INTO trabajador VALUES(null,'JUAN PEREZ CARRILLO','M','45673757','Dirección 1','987864535','juan@mail.com','OPERADOR',1);
INSERT INTO trabajador VALUES(null,'LISSBETH ACURIO HUAMAN','F','21698707','Dirección 3','932869930','liss@mail.com','trabajador',3);
INSERT INTO trabajador VALUES(null,'CARLOS MEDRANO GUZMAN','M','32160022','Direccin 4','948869930','carlos@mail.com','trabajador',4);

INSERT INTO usuario values(null,'claudia@mail.com','123456','ADMINISTRADOR',true,1 );
INSERT INTO usuario values(null,'juan@mail.com','123456','OPERADOR',true,2 );
INSERT INTO usuario values(null,'liss@mail.com','123456','TRABAJADOR',true,3);
INSERT INTO usuario values(null,'carlos@mail.com','123456','TRABAJADOR',true,4);



INSERT INTO requerimiento VALUES(null,CURDATE(),CURDATE(),CURDATE(),'Aqui va la descripción del requemimiento','Aqui va la observación del administrador','PENDIENTE','O.S. 345',3,1,3);
INSERT INTO requerimiento VALUES(null,CURDATE(),CURDATE(),CURDATE(),'Aqui va las descripción','Aqui va la observación del administrador','PENDIENTE','O.S. 332',9,1,4);


INSERT INTO tripulacion VALUES(1,1);
INSERT INTO tripulacion VALUES(1,2);
INSERT INTO tripulacion VALUES(2,3);
