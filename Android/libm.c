// mini_libm.c

// power function
double my_pow(double base, int exp) {
    double result = 1;
    for (int i = 0; i < exp; i++) {
        result *= base;
    }
    return result;
}

// square root (basic)
double my_sqrt(double x) {
    double guess = x / 2.0;
    for (int i = 0; i < 10; i++) {
        guess = (guess + x / guess) / 2;
    }
    return guess;
}
