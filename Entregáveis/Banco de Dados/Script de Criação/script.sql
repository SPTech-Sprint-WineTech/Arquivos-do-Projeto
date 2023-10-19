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
telefoneCell varchar(14) not null,
email varchar(50) not null,
senha varchar(70) not null,
constraint fkUser foreign key (fkEmpresa) references empresa(idEmpresa),
primary key (idUsuario, fkEmpresa) 
);

create table vinicola(
idVinicola int primary key auto_increment,
nomeVinicola varchar(45) not null,
fkEmpresa int not null,
constraint fkEmp foreign key (fkEmpresa) references empresa(idEmpresa)
);

create table enderecoVinicola(
idEnderecoVinicola int auto_increment,
fkVinicola int,
CEP char(9) not null,
numero int not null,
complemento varchar(70),
constraint fkVin foreign key (fkVinicola) references vinicola(idVinicola), 
primary key (idEnderecoVinicola, fkVinicola)
);

create table adega(
idAdega int primary key auto_increment,
tempMax float not null,
tempMin float not null,
umiMax float not null,
umiMin float not null,
fkVinicola int not null,
constraint fkVini foreign key (fkVinicola) references vinicola(idVinicola)
);

create table tipoVinho(
idVinho int primary key auto_increment,
tipo varchar(45) not null,
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
fkSensor int,
umidade float not null,
temperatura float not null,
dataHora datetime default current_timestamp,
constraint fkSense foreign key (fkSensor) references sensor(idSensor),
primary key(idDadosSensor, fkSensor) 
);

-- SCRIPT DE INSERÇÃO DE REGISTRO

insert into empresa (nomeEmpresa, responsavel, telefoneResponsavel, CNPJ, email, senha)
values ('XV de Novembro', 'Adriano', '1234567890', '123456789012345678', 'xvnovembro@contato.com', 'senhaXYZ'),
       ('Goes', 'Rodrigo Goes', '9876543210', '987654321098765432', 'goes@gmail.com', 'senhaABC');
       
insert into usuario (fkEmpresa, nome, telefoneCell, email, senha)
values (1, 'Júlio', '11996131411', 'julio@gmail.com', '01101011011011'),
	   (2, 'Pablo', '11983412909', 'pablo1@yahoo.com', 'monza-oito-cilindros');

insert into vinicola (nomeVinicola, fkEmpresa)
values ('XV de Novembro', 1),
       ('Vinicola Goes', 2);

insert into enderecoVinicola (CEP, numero, complemento, fkVinicola)
values ('12345-678', 123, null, 1),
       ('54321-987', 456, null, 2);

insert into adega (tempMax, tempMin, umiMax, umiMin, fkVinicola)
values (18.0, 10.0, 75.0, 50.0, 1), 
       (20.0, 12.0, 80.0, 55.0, 2);

insert into tipoVinho (tipo, safra, tipoBarril, fkAdega)
values('Cabernet Sauvignon', '2020', 'Carvalho Francês', 1), 
       ('Chardonnay', '2019', 'Carvalho Americano', 2);

insert into sensor (tipoSensor, sensorLoc, fkAdega)
values ('LM35', 'LocalA', 1),
       ('DHT11', 'LocalB', 2); 

insert into dadosSensor (umidade, temperatura, fkSensor)
values (65.5, 15.0, 1),
       (70.0, 14.5, 2);

-- SCRIPT DE CONSULTA DE DADOS

select nomeEmpresa as "Empresa Mãe", responsavel as Responsável, nomeVinicola as Vinícola, cep as CEP, idAdega as Sala, usuario.nome as "Usuário", 
	usuario.telefoneCell as "Telefone Celular" 
		from vinicola 
			join empresa on fkEmpresa = idEmpresa
				join enderecoVinicola on fkVinicola = idVinicola
					join adega on adega.fkVinicola = idVinicola
						join usuario on usuario.fkEmpresa = idEmpresa;
                
select tipo as "Tipo do Vinho", tempMax, tempMin, umiMax, umiMin 
	from adega 
		join tipoVinho on fkAdega = idAdega;

select idSensor, tipoSensor as Modelo, sensorLoc as "Localização do Sensor", umidade as Umidade, temperatura as Temperatura, dataHora as "Data e Hora" 
	from sensor
		join dadosSensor on fkSensor = idSensor;