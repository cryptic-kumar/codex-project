package com.clinical.saas.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "clinics")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Clinic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String contactNumber;
}
