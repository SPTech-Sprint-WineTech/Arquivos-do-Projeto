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

create table vinicola(
idVinicola int primary key auto_increment,
nomeVinicola varchar(45) not null,
fkEmpresa int not null,
constraint fkEmp foreign key (fkEmpresa) references empresa(idEmpresa)
);

create table enderecoVinicola(
idEnderecoVinicola int primary key auto_increment,
CEP char(9) not null,
numero int not null,
complemento varchar(70),
fkVinicola int not null,
constraint fkVin foreign key (fkVinicola) references vinicola(idVinicola)
);

create table adega(
idAdega int primary key auto_increment,
tipoVinho varchar(45) not null,
tempMax float not null,
tempMin float not null,
umiMax float not null,
umiMin float not null,
fkVinicola int not null,
constraint fkVini foreign key (fkVinicola) references vinicola(idVinicola)
);

create table tipoVinho(
idVinho int primary key auto_increment,
tipo varchar(45),
safra varchar(45),
tipoBarril varchar(45),
dataArmazenamento datetime default current_timestamp,
fkAdega int not null,
constraint fkAdega foreign key (fkAdega) references adega(idAdega)
);

create table sensor(
idSensor int primary key auto_increment,
tipoSensor varchar(5) not null,
sensorLoc varchar(50) not null,
constraint chkSensor check(tipoSensor in ('LM35', 'DHT11')),
fkAdega int not null,
constraint fkAdeg foreign key (fkAdega) references adega(idAdega)
);

create table dadosSensor(
idDadosSensor int auto_increment,
umidade float not null,
temperatura float not null,
dataHora datetime default current_timestamp,
fkSensor int,
constraint fkSense foreign key (fkSensor) references sensor(idSensor),
primary key(idDadosSensor, fkSensor) 
);

 