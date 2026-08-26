package com.otr.etax.taxpayer;

import com.otr.etax.common.ConflictException;
import com.otr.etax.common.NotFoundException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/taxpayers")
public class TaxpayerController {

    private final TaxpayerRepository taxpayerRepository;

    public TaxpayerController(TaxpayerRepository taxpayerRepository) {
        this.taxpayerRepository = taxpayerRepository;
    }

    @GetMapping
    public List<Taxpayer> getAll() {
        return taxpayerRepository.findAll();
    }

    @GetMapping("/{id}")
    public Taxpayer getById(@PathVariable Long id) {
        return taxpayerRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Contribuable introuvable (id " + id + ")."));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Taxpayer create(@Valid @RequestBody TaxpayerRequest request) {
        if (taxpayerRepository.existsByNif(request.nif())) {
            throw new ConflictException("Un contribuable avec ce NIF existe déjà.");
        }
        return taxpayerRepository.save(request.toEntity());
    }

    @PutMapping("/{id}")
    public Taxpayer update(@PathVariable Long id, @Valid @RequestBody TaxpayerRequest request) {
        Taxpayer taxpayer = taxpayerRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Contribuable introuvable (id " + id + ")."));

        boolean nifTakenByAnother = taxpayerRepository.existsByNif(request.nif())
                && !taxpayer.getNif().equals(request.nif());
        if (nifTakenByAnother) {
            throw new ConflictException("Un contribuable avec ce NIF existe déjà.");
        }

        request.applyTo(taxpayer);
        return taxpayerRepository.save(taxpayer);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!taxpayerRepository.existsById(id)) {
            throw new NotFoundException("Contribuable introuvable (id " + id + ").");
        }
        taxpayerRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
