package com.julnarot.rpapi.book;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@Table(name = "rp_user")
public class Book {
    @Id
    @SequenceGenerator(name = "book_sequence", sequenceName = "book_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "book_sequence")
    private Long id;

    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String category;
    private String subtitle;
    private String bookAbstract;
    private Long numPages;
    private String coverImageUrl;
    @Column(columnDefinition = "BOOLEAN NOT NULL DEFAULT TRUE")
    private boolean selected = false;
    @Column(columnDefinition = "BOOLEAN NOT NULL DEFAULT TRUE")
    private boolean favorite = false;

    private String username;

}
