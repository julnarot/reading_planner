package com.julnarot.rpapi.book;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("books")
@RequiredArgsConstructor
public class BookController {
    private final BookRepository bookRepository;

    @GetMapping()
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }
    @PostMapping()
    public Book saveBook(@RequestBody Book instance,  HttpServletResponse response) {
        Book book = bookRepository.save(instance);
        if(book.getId() == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        response.setStatus(HttpServletResponse.SC_CREATED);
        return book;
    }

}
