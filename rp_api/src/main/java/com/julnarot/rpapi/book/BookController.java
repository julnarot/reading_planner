package com.julnarot.rpapi.book;

import java.util.List;

import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    public Book saveBook(@RequestBody Book instance, HttpServletResponse response) {
        Book book = bookRepository.save(instance);
        if (book.getId() == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        response.setStatus(HttpServletResponse.SC_CREATED);
        return book;
    }

    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable Long id, HttpServletResponse response) {
        if (id != null) {
            bookRepository.deleteById(id);
            response.setStatus(HttpServletResponse.SC_NO_CONTENT);
        }
    }

}
