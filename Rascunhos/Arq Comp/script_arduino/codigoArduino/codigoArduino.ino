//Usando 2 sensores LM35(Temperatura)
#include "DHT.h"
#define dht_type DHT11 //define qual o tipo de sensor DHTxx que se está utilizando
const int LM35 = A4; //Define o pino que irá ler a saida do LM35
float temperatura; //Variável que ira armazenar a temperatura medida
int dht_pin = A1;
DHT dht_1 = DHT(dht_pin, dht_type); //pode-se configurar diversos sensores DHTxx

//Função que será executada uma vez quando ligar ou resetar o Arduino
void setup(){
  Serial.begin(9600); //Inicializa a comunicação serial
  dht_1.begin();
}

//Função que será executada continuamente
void loop(){
  temperatura = (float(analogRead(LM35))*5/((1023))/0.01)- 12;
  float umidade = dht_1.readHumidity()+16;
  
  //float temperatura2 = dht_1.readTemperature();
  //Serial.print("Temperatura: ");
  if(isnan(umidade)){
    Serial.println("Erro ao ler o DHT");
  } else{
    Serial.print(umidade);
    Serial.print(",");
    Serial.println(temperatura);
    //Serial.print("Umidade: ");
    //Serial.print(",");
    //Serial.print("Temperatura: ");
    //Serial.println(temperatura2);
    //Serial.print(" °C");
  }
    delay(1000);
}