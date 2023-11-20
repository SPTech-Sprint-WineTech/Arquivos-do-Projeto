create database WineTech;

use WineTech;

-- SCRIPT DE CRIAÇÃO DE TABELAS
create table empresa(
idEmpresa int primary key auto_increment,
nomeEmpresa varchar(45) not null,
responsavel varchar(45) not null,
telefoneResponsavel varchar(14) not null unique,
CNPJ char(18) not null unique,
email varchar(50) not null unique,
senha varchar(70) not null
);

create table usuario(
idUsuario int auto_increment,
fkEmpresa int,
nome varchar(45) not null,
telefoneCel varchar(14) not null,
email varchar(50) not null,
senha varchar(70) not null,
validacao tinyint(1),
constraint chkValidacao check(validacao in(0, 1)),
constraint fkUser foreign key (fkEmpresa) references empresa(idEmpresa),
primary key (idUsuario, fkEmpresa) 
);

create table vinicola(
idVinicola int primary key auto_increment,
nomeVinicola varchar(45) not null,
fkEmpresa int,
constraint fkEmp foreign key (fkEmpresa) references empresa(idEmpresa)
);

create table enderecoVinicola(
idEnderecoVinicola int primary key auto_increment,
fkVinicola int,
CEP char(9) not null,
numero int not null,
complemento varchar(70),
constraint fkVin foreign key (fkVinicola) references vinicola(idVinicola)
);

create table adega(
idAdega int primary key auto_increment,
nomeAdega varchar(45) not null,
tempIdeal decimal(4, 2) not null,
umiIdeal decimal(4, 2) not null,
fkVinicola int,
constraint fkVini foreign key (fkVinicola) references vinicola(idVinicola)
);

create table tipoVinho(
idVinho int primary key auto_increment,
tipo varchar(45) not null,
safra varchar(45),
tipoBarril varchar(45),
dataArmazenamento datetime default current_timestamp,
fkAdega int,
constraint fkAdega foreign key (fkAdega) references adega(idAdega)
);

create table sensor(
idSensor int primary key auto_increment,
tipoSensor varchar(5) not null,
sensorLoc varchar(50) not null,
constraint chkSensor check(tipoSensor in ('LM35', 'DHT11')),
fkAdega int,
constraint fkAdeg foreign key (fkAdega) references adega(idAdega)
);

create table dadosSensor(
idDadosSensor int auto_increment,
fkSensor int,
registro decimal(4,2),
dataHora datetime default current_timestamp,
constraint fkSense foreign key (fkSensor) references sensor(idSensor),
primary key(idDadosSensor, fkSensor) 
);

-- SCRIPT DE INSERÇÃO DE REGISTRO

/* insert into empresa (nomeEmpresa, responsavel, telefoneResponsavel, CNPJ, email, senha)
values ('XV de Novembro', 'Adriano', '1234567890', '123456789012345678', 'xvnovembro@contato.com', 'senhaXYZ');
       
insert into usuario (fkEmpresa, nome, telefoneCel, email, senha)
values 	(1, 'xvdenovembrosr', '11996131411', 'xvdenovembro@gmail.com', '01101011011011');

insert into vinicola (nomeVinicola, fkEmpresa)
values 	('XV de Novembro - SR', 1);

insert into enderecoVinicola (CEP, numero, complemento, fkVinicola)
values 	('12345-678', 123, null, 1);

insert into adega (nomeAdega, tempIdeal, umiIdeal, fkVinicola)
values ('Adega Leão', 15.00, 75.00, 1), 
       ('Adega Rosê', 15.0, 75.00, 1);

insert into tipoVinho (tipo, safra, tipoBarril, fkAdega)
values('Cabernet Sauvignon', '2020', 'Carvalho Francês', 1), 
       ('Chardonnay', '2019', 'Carvalho Americano', 1),
       ('Prosecco', '2021', 'Carvalho Americano', 2),
       ('Pinot Noir', '2018', 'Carvalho Francês', 2);

insert into sensor (tipoSensor, sensorLoc, fkAdega)
values ('LM35', 'LocalA', 1),
       ('DHT11', 'LocalA', 1),
       ('LM35', 'LocalB', 2),
       ('DHT11', 'LocalB', 2); 

insert into dadosSensor (fkSensor, registro, dataHora)
values (1, 15.00, '2023-10-31 12:05:00'),
       (2, 75.00, '2023-10-31 12:05:00'),
       (3, 26.00, '2023-10-31 12:05:00'),
       (4, 67.00, '2023-10-31 12:05:00');

-- SCRIPT DE CONSULTA DE DADOS

select nomeEmpresa as "Empresa Mãe", responsavel as Responsável, nomeVinicola as Vinícola, nomeAdega as Adega 
		from vinicola 
			join empresa on fkEmpresa = idEmpresa
				join enderecoVinicola on fkVinicola = idVinicola
					join adega on adega.fkVinicola = idVinicola
						join usuario on usuario.fkEmpresa = idEmpresa;
                        
select nomeEmpresa as "Empresa Mãe", usuario.nome as "User", telefoneCel as "Telefone Vinícola" 
	from empresa 
		join usuario on idEmpresa = fkEmpresa;
                
select nomeVinicola as 'Vinícola', nomeAdega as Adega, tipo as "Tipo do Vinho" 
	from adega 
		join tipoVinho on fkAdega = idAdega
			join vinicola on fkVinicola = idVinicola;

select nomeVinicola as Vinícola, nomeAdega as Adega, tipoSensor as "Modelo Sensor", sensorLoc as "Localização do Sensor", 
Registro, dataHora as "Data e Hora" 
	from sensor
		join dadosSensor on fkSensor = idSensor
			join adega on fkAdega = idAdega
				join vinicola on fkVinicola = idVinicola; */
                
insert into empresa (nomeEmpresa, responsavel, telefoneResponsavel, cnpj, email, senha) 
values ('WineTech', 'admin', '11-9000000000', '000000000000000000', 'admin@winetech.com', 'saoroque');

insert into usuario (fkEmpresa, nome, telefoneCel, email, senha)
values (1, 'admin', '11-9100000000', 'useradmin@gmail.com', 'adminadmin');
create database WineTech;

use WineTech;

-- SCRIPT DE CRIAÇÃO DE TABELAS
create table empresa(
idEmpresa int primary key auto_increment,
nomeEmpresa varchar(45) not null,
responsavel varchar(45) not null,
telefoneResponsavel varchar(14) not null unique,
CNPJ char(18) not null unique,
email varchar(50) not null unique,
senha varchar(70) not null
);

create table usuario(
idUsuario int auto_increment,
fkEmpresa int,
nome varchar(45) not null,
telefoneCel varchar(14) not null,
email varchar(50) not null,
senha varchar(70) not null,
validacao tinyint(1),
constraint chkValidacao check(validacao in(0, 1)),
constraint fkUser foreign key (fkEmpresa) references empresa(idEmpresa),
primary key (idUsuario, fkEmpresa) 
);

create table vinicola(
idVinicola int primary key auto_increment,
nomeVinicola varchar(45) not null,
fkEmpresa int,
constraint fkEmp foreign key (fkEmpresa) references empresa(idEmpresa)
);

create table enderecoVinicola(
idEnderecoVinicola int primary key auto_increment,
fkVinicola int,
CEP char(9) not null,
numero int not null,
complemento varchar(70),
constraint fkVin foreign key (fkVinicola) references vinicola(idVinicola)
);

create table adega(
idAdega int primary key auto_increment,
nomeAdega varchar(45) not null,
tempIdeal decimal(4, 2) not null,
umiIdeal decimal(4, 2) not null,
fkVinicola int,
constraint fkVini foreign key (fkVinicola) references vinicola(idVinicola)
);

create table tipoVinho(
idVinho int primary key auto_increment,
tipo varchar(45) not null,
safra varchar(45),
tipoBarril varchar(45),
dataArmazenamento datetime default current_timestamp,
fkAdega int,
constraint fkAdega foreign key (fkAdega) references adega(idAdega)
);

create table sensor(
idSensor int primary key auto_increment,
tipoSensor varchar(5) not null,
sensorLoc varchar(50) not null,
constraint chkSensor check(tipoSensor in ('LM35', 'DHT11')),
fkAdega int,
constraint fkAdeg foreign key (fkAdega) references adega(idAdega)
);

create table dadosSensor(
idDadosSensor int auto_increment,
fkSensor int,
registro decimal(4,2),
dataHora datetime default current_timestamp,
constraint fkSense foreign key (fkSensor) references sensor(idSensor),
primary key(idDadosSensor, fkSensor) 
);

-- SCRIPT DE INSERÇÃO DE REGISTRO

/* insert into empresa (nomeEmpresa, responsavel, telefoneResponsavel, CNPJ, email, senha)
values ('XV de Novembro', 'Adriano', '1234567890', '123456789012345678', 'xvnovembro@contato.com', 'senhaXYZ');
       
insert into usuario (fkEmpresa, nome, telefoneCel, email, senha)
values 	(1, 'xvdenovembrosr', '11996131411', 'xvdenovembro@gmail.com', '01101011011011');

insert into vinicola (nomeVinicola, fkEmpresa)
values 	('XV de Novembro - SR', 1);

insert into enderecoVinicola (CEP, numero, complemento, fkVinicola)
values 	('12345-678', 123, null, 1);

insert into adega (nomeAdega, tempIdeal, umiIdeal, fkVinicola)
values ('Adega Leão', 15.00, 75.00, 1), 
       ('Adega Rosê', 15.0, 75.00, 1);

insert into tipoVinho (tipo, safra, tipoBarril, fkAdega)
values('Cabernet Sauvignon', '2020', 'Carvalho Francês', 1), 
       ('Chardonnay', '2019', 'Carvalho Americano', 1),
       ('Prosecco', '2021', 'Carvalho Americano', 2),
       ('Pinot Noir', '2018', 'Carvalho Francês', 2);

insert into sensor (tipoSensor, sensorLoc, fkAdega)
values ('LM35', 'LocalA', 1),
       ('DHT11', 'LocalA', 1),
       ('LM35', 'LocalB', 2),
       ('DHT11', 'LocalB', 2); 

insert into dadosSensor (fkSensor, registro, dataHora)
values (1, 15.00, '2023-10-31 12:05:00'),
       (2, 75.00, '2023-10-31 12:05:00'),
       (3, 26.00, '2023-10-31 12:05:00'),
       (4, 67.00, '2023-10-31 12:05:00');

-- SCRIPT DE CONSULTA DE DADOS

select nomeEmpresa as "Empresa Mãe", responsavel as Responsável, nomeVinicola as Vinícola, nomeAdega as Adega 
		from vinicola 
			join empresa on fkEmpresa = idEmpresa
				join enderecoVinicola on fkVinicola = idVinicola
					join adega on adega.fkVinicola = idVinicola
						join usuario on usuario.fkEmpresa = idEmpresa;
                        
select nomeEmpresa as "Empresa Mãe", usuario.nome as "User", telefoneCel as "Telefone Vinícola" 
	from empresa 
		join usuario on idEmpresa = fkEmpresa;
                
select nomeVinicola as 'Vinícola', nomeAdega as Adega, tipo as "Tipo do Vinho" 
	from adega 
		join tipoVinho on fkAdega = idAdega
			join vinicola on fkVinicola = idVinicola;

select nomeVinicola as Vinícola, nomeAdega as Adega, tipoSensor as "Modelo Sensor", sensorLoc as "Localização do Sensor", 
Registro, dataHora as "Data e Hora" 
	from sensor
		join dadosSensor on fkSensor = idSensor
			join adega on fkAdega = idAdega
				join vinicola on fkVinicola = idVinicola; */
                
insert into empresa (nomeEmpresa, responsavel, telefoneResponsavel, cnpj, email, senha) 
values ('WineTech', 'admin', '11-9000000000', '000000000000000000', 'admin@winetech.com', 'saoroque');

insert into usuario (fkEmpresa, nome, telefoneCel, email, senha)
values (1, 'admin', '11-9100000000', 'useradmin@gmail.com', 'adminadmin');

CREATE USER [usuarioParaAPIWebDataViz_datawriter_datareader]
WITH PASSWORD = '#Gf_senhaParaAPIWebDataViz',
DEFAULT_SCHEMA = dbo;

EXEC sys.sp_addrolemember @rolename = N'db_datawriter',
@membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';

EXEC sys.sp_addrolemember @rolename = N'db_datareader',
@membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';