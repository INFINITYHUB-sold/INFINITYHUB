// mini_libc.c
#include <unistd.h>

// simple write function
int my_write(int fd, const char *msg, int len) {
    return write(fd, msg, len);
}

// simple strlen
int my_strlen(const char *str) {
    int i = 0;
    while (str[i] != '\0') i++;
    return i;
}

// simple puts
void my_puts(const char *str) {
    my_write(1, str, my_strlen(str));
}
