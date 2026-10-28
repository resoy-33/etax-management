package com.otr.etax.taxpayer;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TaxpayerRepository extends JpaRepository<Taxpayer, Long> {
    
    boolean existsByNif(String nif);
}
