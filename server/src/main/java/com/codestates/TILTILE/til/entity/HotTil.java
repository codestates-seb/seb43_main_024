package com.codestates.TILTILE.til.entity;

import com.codestates.TILTILE.til.entity.Til;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
public class HotTil {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long hotTil_id;

    @OneToOne
    @JoinColumn(name = "TIL_ID")
    private Til til;
}
