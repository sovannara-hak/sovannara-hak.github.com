#include <stdlib.h>
#include <stdio.h>

void foo(void){

  int somme, n_premiers_entiers, indice;

  printf("calcule la somme des n premiers entiers, entrez n : ");
  scanf("%d", n_premiers_entiers);

  indice = 0;
  somme = 0;

  while(indice <= n_premiers_entiers){    
    somme += indice;
    indice++;
  }
  printf("la somme est %d\n", somme);

}

int main(void){

  foo();
  exit(0);

}

