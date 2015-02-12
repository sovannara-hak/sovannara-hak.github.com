#include <stdlib.h>
#include <stdio.h>
#include <time.h>

void foo(void){

  int i = 0;
  double* x = (double *) malloc(100*sizeof(double));

  // Initialise le generateur de nombres pseudo-aleatoires
  srand(time(NULL));

  for(i = 0; i <= 100; i++) {   

    // Genere un reel compris entre 0 et 1
    *(x+i) = (double) rand()/(RAND_MAX);
    // l'affiche
    printf("%d | %f\t",i,*(x+i));
  }
  printf("\n");

}
  

int main(void){

  while(1)
    foo();

  exit(0);
}
