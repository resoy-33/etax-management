package com.otr.etax.taxpayer;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDate;

@Entity
@Table(name = "taxpayers")
public class Taxpayer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** "Personne Physique" or "Personne Morale". */
    @Column(nullable = false)
    private String taxpayerType;

    @Column(nullable = false, unique = true)
    private String nif;

    /** "Actif" | "Inactif" | "Suspendu" | "En attente". */
    @Column(nullable = false)
    private String status;

    private LocalDate registrationDate;

    // Personne Physique
    private String firstName;
    private String lastName;
    private String cin;
    private LocalDate birthDate;

    // Personne Morale
    private String companyName;
    private String tradeRegister;

    // Coordonnées
    private String phone;
    private String email;
    private String address;
    private String city;
    private String postalCode;

    // Informations fiscales
    private String activity;
    private String taxCenter;
    private String taxRegime;

    public Taxpayer() {
    }

    public static Builder builder() {
        return new Builder();
    }

    // --- Getters / setters ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTaxpayerType() {
        return taxpayerType;
    }

    public void setTaxpayerType(String taxpayerType) {
        this.taxpayerType = taxpayerType;
    }

    public String getNif() {
        return nif;
    }

    public void setNif(String nif) {
        this.nif = nif;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(LocalDate registrationDate) {
        this.registrationDate = registrationDate;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getCin() {
        return cin;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getTradeRegister() {
        return tradeRegister;
    }

    public void setTradeRegister(String tradeRegister) {
        this.tradeRegister = tradeRegister;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getActivity() {
        return activity;
    }

    public void setActivity(String activity) {
        this.activity = activity;
    }

    public String getTaxCenter() {
        return taxCenter;
    }

    public void setTaxCenter(String taxCenter) {
        this.taxCenter = taxCenter;
    }

    public String getTaxRegime() {
        return taxRegime;
    }

    public void setTaxRegime(String taxRegime) {
        this.taxRegime = taxRegime;
    }

    /** Hand-written builder (equivalent to what Lombok's @Builder used to generate). */
    public static class Builder {
        private final Taxpayer taxpayer = new Taxpayer();

        public Builder taxpayerType(String taxpayerType) {
            taxpayer.taxpayerType = taxpayerType;
            return this;
        }

        public Builder nif(String nif) {
            taxpayer.nif = nif;
            return this;
        }

        public Builder status(String status) {
            taxpayer.status = status;
            return this;
        }

        public Builder registrationDate(LocalDate registrationDate) {
            taxpayer.registrationDate = registrationDate;
            return this;
        }

        public Builder firstName(String firstName) {
            taxpayer.firstName = firstName;
            return this;
        }

        public Builder lastName(String lastName) {
            taxpayer.lastName = lastName;
            return this;
        }

        public Builder cin(String cin) {
            taxpayer.cin = cin;
            return this;
        }

        public Builder birthDate(LocalDate birthDate) {
            taxpayer.birthDate = birthDate;
            return this;
        }

        public Builder companyName(String companyName) {
            taxpayer.companyName = companyName;
            return this;
        }

        public Builder tradeRegister(String tradeRegister) {
            taxpayer.tradeRegister = tradeRegister;
            return this;
        }

        public Builder phone(String phone) {
            taxpayer.phone = phone;
            return this;
        }

        public Builder email(String email) {
            taxpayer.email = email;
            return this;
        }

        public Builder address(String address) {
            taxpayer.address = address;
            return this;
        }

        public Builder city(String city) {
            taxpayer.city = city;
            return this;
        }

        public Builder postalCode(String postalCode) {
            taxpayer.postalCode = postalCode;
            return this;
        }

        public Builder activity(String activity) {
            taxpayer.activity = activity;
            return this;
        }

        public Builder taxCenter(String taxCenter) {
            taxpayer.taxCenter = taxCenter;
            return this;
        }

        public Builder taxRegime(String taxRegime) {
            taxpayer.taxRegime = taxRegime;
            return this;
        }

        public Taxpayer build() {
            return taxpayer;
        }
    }
}
