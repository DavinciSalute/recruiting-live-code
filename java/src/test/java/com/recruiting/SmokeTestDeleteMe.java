package com.recruiting;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

/**
 * Test usa e getta: verifica solo che il wiring JUnit 5 + Mockito funzioni
 * ({@code mvn test} dalla cartella java/). Da eliminare dopo il check.
 */
@ExtendWith(MockitoExtension.class)
class SmokeTestDeleteMe {

    @Mock
    List<String> mockedList;

    @Test
    void junitWorks() {
        assertEquals(4, 2 + 2);
    }

    @Test
    void mockitoWorks() {
        when(mockedList.size()).thenReturn(42);
        assertEquals(42, mockedList.size());
    }
}
