create table mapas(
codigo serial primary key;
txtOrigem varchar;
txtDestino varchar;
distancia varchar,
tempo varchar,
hora varchar
);

create table direcao (
codigo serial primary key,
inicio varchar,
fim varchar
);

create table refeicao (
codigo serial primary key,
inicio varchar,
fim varchar
);

create table descanso (
codigo serial primary key,
inicio varchar,
fim varchar
);

create table carga (
codigo serial primary key,
inicio varchar,
fim varchar
);

create table descarga (
codigo serial primary key,
inicio varchar,
fim varchar
);

create table tempoc (
codigo serial primary key,
inicio varchar,
fim varchar
);

create table abastecimento (
codigo serial primary key,
inicio varchar,
fim varchar
);

create table fiscalizacao (
codigo serial primary key,
inicio varchar,
fim varchar
);

create table manutencao (
codigo serial primary key,
inicio varchar,
fim varchar
);

create table pernoite (
codigo serial primary key,
inicio varchar,
fim varchar
);

