package com.otr.etax.taxpayer;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record TaxpayerRequest(
        @NotBlank String taxpayerType,

        @NotBlank
        @Pattern(regexp = "^[0-9]{7,15}$", message = "NIF invalide (7 à 15 chiffres).")
        String nif,

        @NotBlank String status,
        LocalDate registrationDate,

        String firstName,
        String lastName,
        String cin,
        LocalDate birthDate,

        String companyName,
        String tradeRegister,

        @NotBlank
        @Pattern(regexp = "^[0-9]{8}$", message = "Numéro de téléphone invalide (8 chiffres).")
        String phone,

        @NotBlank @Email String email,

        @NotBlank
        @Size(min = 10, max = 150)
        String address,

        @NotBlank String city,

        @NotBlank
        @Pattern(regexp = "^[0-9]{4}$", message = "Code postal invalide (4 chiffres).")
        String postalCode,

        @NotBlank String activity,
        @NotBlank String taxCenter,
        @NotBlank String taxRegime
) {
    public Taxpayer toEntity() {
        return Taxpayer.builder()
                .taxpayerType(taxpayerType)
                .nif(nif)
                .status(status)
                .registrationDate(registrationDate)
                .firstName(firstName)
                .lastName(lastName)
                .cin(cin)
                .birthDate(birthDate)
                .companyName(companyName)
                .tradeRegister(tradeRegister)
                .phone(phone)
                .email(email)
                .address(address)
                .city(city)
                .postalCode(postalCode)
                .activity(activity)
                .taxCenter(taxCenter)
                .taxRegime(taxRegime)
                .build();
    }

    public void applyTo(Taxpayer taxpayer) {
        taxpayer.setTaxpayerType(taxpayerType);
        taxpayer.setNif(nif);
        taxpayer.setStatus(status);
        taxpayer.setRegistrationDate(registrationDate);
        taxpayer.setFirstName(firstName);
        taxpayer.setLastName(lastName);
        taxpayer.setCin(cin);
        taxpayer.setBirthDate(birthDate);
        taxpayer.setCompanyName(companyName);
        taxpayer.setTradeRegister(tradeRegister);
        taxpayer.setPhone(phone);
        taxpayer.setEmail(email);
        taxpayer.setAddress(address);
        taxpayer.setCity(city);
        taxpayer.setPostalCode(postalCode);
        taxpayer.setActivity(activity);
        taxpayer.setTaxCenter(taxCenter);
        taxpayer.setTaxRegime(taxRegime);
    }
}
