// the main creates two children, both mutates in program_info

#include <stdio.h> //printf
#include <stdlib.h>
#include <unistd.h> // fork
#include <sys/wait.h>
#include <sys/types.h>// pid_t

 
int main (void)
{
	char *argv1[3];
	char *argv2[3];
	
	argv1[0] = "program_info"; argv1[1] = "Luke"; argv1[2] = NULL;
	argv2[0] = "program_info"; argv2[1] = "Leia"; argv2[2] = NULL;
	
	pid_t my_pid  = getpid();
	pid_t my_ppid = getppid();
	
	printf("Anakin:\n");
	printf("pid = %d\n",my_pid);
	printf("ppid = %d\n",my_ppid);
	
	printf("I will now generate my children ..\n\n");
	
	my_pid = fork();
	
	if(my_pid == -1)
	{
		puts("Fork error on first child"); exit(-1);
	}
	else if(my_pid == 0) //first child
	{
		printf("First child:\n");
		execv("./program_info", argv1);
		puts("Luke created");
		exit(0);
	}
	else
	{
		// go on and make the second child
		my_pid = fork();
		if(my_pid == -1)
		{
			puts("Fork error on second child"); exit(-1);
		}
		else if(my_pid == 0) //second child
		{
			printf("Second child:\n");
			execv("./program_info", argv2);
			puts("Leia created");
			exit(0);
		}
		else
		{
			// the parent
		}
	}
	
	puts("Anakin now waits the children ..\n");
	wait(NULL);

	puts("\nAnakin now dies ..\n");
	return 0;
}

