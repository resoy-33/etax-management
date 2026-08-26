package com.otr.etax.common;

import com.otr.etax.admin.Admin;
import com.otr.etax.admin.AdminRepository;
import com.otr.etax.taxpayer.Taxpayer;
import com.otr.etax.taxpayer.TaxpayerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

/**
 * Seeds a starter admin account and a handful of test taxpayers the first
 * time the app runs against an empty database. Safe to leave in — it's a
 * no-op once data already exists.
 */
@Component
public class DataSeeder implements CommandLineRunner {

    private final AdminRepository adminRepository;
    private final TaxpayerRepository taxpayerRepository;

    public DataSeeder(AdminRepository adminRepository, TaxpayerRepository taxpayerRepository) {
        this.adminRepository = adminRepository;
        this.taxpayerRepository = taxpayerRepository;
    }

    @Override
    public void run(String... args) {
        seedAdmin();
        seedTaxpayers();
    }

    private void seedAdmin() {
        if (adminRepository.count() > 0) {
            return;
        }

        Admin admin = new Admin();
        admin.setUsername("admin");
        // BCrypt hash of "admin123" — change this account's password after first login.
        admin.setPassword("$2b$10$EXQJ28xuL9XKNwRok7BjXOZ6Z.sj8JcwYljUda5jNtTNs.38yQz96");
        admin.setFullName("Ama Kuadzi");
        admin.setEmail("ama.kuadzi@otr.tg");
        admin.setPhone("90123456");
        admin.setRole("Administrateur");
        adminRepository.save(admin);
    }

    private void seedTaxpayers() {
        if (taxpayerRepository.count() > 0) {
            return;
        }

        List<Taxpayer> taxpayers = List.of(
                Taxpayer.builder().taxpayerType("Personne Physique").nif("1000234567").status("Actif")
                        .registrationDate(LocalDate.of(2023, 2, 14))
                        .firstName("Komi").lastName("Adjovi").cin("10345678").birthDate(LocalDate.of(1988, 5, 12))
                        .companyName("").tradeRegister("")
                        .phone("90112233").email("komi.adjovi@example.tg")
                        .address("12 Rue des Manguiers, Bè").city("Lomé").postalCode("1000")
                        .activity("Commerce général").taxCenter("CIME Lomé I").taxRegime("Réel").build(),

                Taxpayer.builder().taxpayerType("Personne Morale").nif("1000345678").status("Actif")
                        .registrationDate(LocalDate.of(2022, 11, 3))
                        .firstName("").lastName("").cin("").birthDate(null)
                        .companyName("Togo Agro Solutions SARL").tradeRegister("RC/LOM/2022/B/1452")
                        .phone("22212345").email("contact@agosolutions.tg")
                        .address("Zone Industrielle, Route de Kpalimé").city("Lomé").postalCode("1002")
                        .activity("Agro-industrie").taxCenter("CIME Lomé II").taxRegime("Réel").build(),

                Taxpayer.builder().taxpayerType("Personne Physique").nif("1000456789").status("En attente")
                        .registrationDate(LocalDate.of(2024, 1, 20))
                        .firstName("Akossiwa").lastName("Dogbe").cin("20456789").birthDate(LocalDate.of(1995, 9, 30))
                        .companyName("").tradeRegister("")
                        .phone("91223344").email("akossiwa.dogbe@example.tg")
                        .address("45 Avenue de la Libération").city("Kara").postalCode("3000")
                        .activity("Couture et prêt-à-porter").taxCenter("CDI Kara").taxRegime("Micro Entreprise").build(),

                Taxpayer.builder().taxpayerType("Personne Morale").nif("1000567890").status("Actif")
                        .registrationDate(LocalDate.of(2021, 6, 18))
                        .firstName("").lastName("").cin("").birthDate(null)
                        .companyName("Sahel Construction SA").tradeRegister("RC/LOM/2021/A/0987")
                        .phone("22334455").email("info@sahelconstruction.tg")
                        .address("Boulevard du 13 Janvier").city("Lomé").postalCode("1001")
                        .activity("BTP et travaux publics").taxCenter("CIME Lomé I").taxRegime("Réel").build(),

                Taxpayer.builder().taxpayerType("Personne Physique").nif("1000678901").status("Suspendu")
                        .registrationDate(LocalDate.of(2020, 8, 5))
                        .firstName("Yao").lastName("Mensah").cin("30567890").birthDate(LocalDate.of(1979, 12, 1))
                        .companyName("").tradeRegister("")
                        .phone("92334455").email("yao.mensah@example.tg")
                        .address("Quartier Tokoin, Rue 218").city("Lomé").postalCode("1000")
                        .activity("Transport de marchandises").taxCenter("CIME Lomé III").taxRegime("Forfaitaire").build(),

                Taxpayer.builder().taxpayerType("Personne Physique").nif("1000789012").status("Actif")
                        .registrationDate(LocalDate.of(2023, 9, 12))
                        .firstName("Essowe").lastName("Bakoma").cin("40678901").birthDate(LocalDate.of(1992, 3, 22))
                        .companyName("").tradeRegister("")
                        .phone("93445566").email("essowe.bakoma@example.tg")
                        .address("Rue du Marché Central").city("Sokodé").postalCode("4000")
                        .activity("Vente de matériaux de construction").taxCenter("CDI Sokodé").taxRegime("Réel").build(),

                Taxpayer.builder().taxpayerType("Personne Morale").nif("1000890123").status("En attente")
                        .registrationDate(LocalDate.of(2024, 4, 2))
                        .firstName("").lastName("").cin("").birthDate(null)
                        .companyName("Plateaux Fresh Foods SUARL").tradeRegister("RC/ATK/2024/C/0231")
                        .phone("22556677").email("contact@plateauxfresh.tg")
                        .address("Route Nationale N°5").city("Atakpamé").postalCode("5000")
                        .activity("Transformation agroalimentaire").taxCenter("CDI Atakpamé").taxRegime("Micro Entreprise").build(),

                Taxpayer.builder().taxpayerType("Personne Physique").nif("1000901234").status("Actif")
                        .registrationDate(LocalDate.of(2019, 10, 27))
                        .firstName("Abra").lastName("Kokou").cin("50789012").birthDate(LocalDate.of(1985, 7, 15))
                        .companyName("").tradeRegister("")
                        .phone("94556677").email("abra.kokou@example.tg")
                        .address("Quartier Hanyigba").city("Kpalimé").postalCode("6000")
                        .activity("Restauration").taxCenter("CDI Kpalimé").taxRegime("Forfaitaire").build(),

                Taxpayer.builder().taxpayerType("Personne Morale").nif("1001012345").status("Inactif")
                        .registrationDate(LocalDate.of(2018, 3, 11))
                        .firstName("").lastName("").cin("").birthDate(null)
                        .companyName("Savanes Import Export SARL").tradeRegister("RC/DAP/2018/D/0456")
                        .phone("22667788").email("contact@savanesimport.tg")
                        .address("Avenue de l'Indépendance").city("Dapaong").postalCode("7000")
                        .activity("Import-export de céréales").taxCenter("CDI Dapaong").taxRegime("Réel").build(),

                Taxpayer.builder().taxpayerType("Personne Physique").nif("1001123456").status("Actif")
                        .registrationDate(LocalDate.of(2022, 1, 9))
                        .firstName("Sena").lastName("Amegan").cin("60890123").birthDate(LocalDate.of(1998, 11, 4))
                        .companyName("").tradeRegister("")
                        .phone("95667788").email("sena.amegan@example.tg")
                        .address("Rue des Palmiers").city("Tsévié").postalCode("1100")
                        .activity("Coiffure et esthétique").taxCenter("CDI Tsévié").taxRegime("Micro Entreprise").build(),

                Taxpayer.builder().taxpayerType("Personne Morale").nif("1001234567").status("Actif")
                        .registrationDate(LocalDate.of(2020, 5, 30))
                        .firstName("").lastName("").cin("").birthDate(null)
                        .companyName("Golfe Numérique SA").tradeRegister("RC/LOM/2020/B/0765")
                        .phone("22778899").email("hello@golfenumerique.tg")
                        .address("Immeuble CityCenter, Boulevard du Mono").city("Lomé").postalCode("1003")
                        .activity("Services informatiques").taxCenter("CIME Lomé II").taxRegime("Réel").build(),

                Taxpayer.builder().taxpayerType("Personne Physique").nif("1001345678").status("En attente")
                        .registrationDate(LocalDate.of(2024, 6, 17))
                        .firstName("Fofo").lastName("Adjaho").cin("70901234").birthDate(LocalDate.of(1990, 2, 28))
                        .companyName("").tradeRegister("")
                        .phone("96778899").email("fofo.adjaho@example.tg")
                        .address("Quartier Bè-Kpota").city("Lomé").postalCode("1000")
                        .activity("Menuiserie").taxCenter("CIME Lomé III").taxRegime("Forfaitaire").build(),

                Taxpayer.builder().taxpayerType("Personne Physique").nif("1001456789").status("Suspendu")
                        .registrationDate(LocalDate.of(2017, 12, 8))
                        .firstName("Kossi").lastName("Nyavor").cin("80012345").birthDate(LocalDate.of(1975, 4, 19))
                        .companyName("").tradeRegister("")
                        .phone("97889900").email("kossi.nyavor@example.tg")
                        .address("Quartier Adidogomé").city("Lomé").postalCode("1004")
                        .activity("Quincaillerie").taxCenter("CIME Lomé I").taxRegime("Réel").build(),

                Taxpayer.builder().taxpayerType("Personne Morale").nif("1001567890").status("Actif")
                        .registrationDate(LocalDate.of(2023, 7, 25))
                        .firstName("").lastName("").cin("").birthDate(null)
                        .companyName("Maritime Logistics Togo SARL").tradeRegister("RC/LOM/2023/A/1120")
                        .phone("22889900").email("ops@maritimelogistics.tg")
                        .address("Zone Portuaire, Port Autonome de Lomé").city("Lomé").postalCode("1005")
                        .activity("Transit et logistique portuaire").taxCenter("CIME Lomé II").taxRegime("Réel").build(),

                Taxpayer.builder().taxpayerType("Personne Physique").nif("1001678901").status("Actif")
                        .registrationDate(LocalDate.of(2021, 9, 14))
                        .firstName("Ama").lastName("Kuevi").cin("90123456").birthDate(LocalDate.of(1993, 6, 8))
                        .companyName("").tradeRegister("")
                        .phone("98990011").email("ama.kuevi@example.tg")
                        .address("Rue des Cocotiers").city("Aného").postalCode("1200")
                        .activity("Pêche et vente de poisson").taxCenter("CDI Aného").taxRegime("Forfaitaire").build()
        );

        taxpayerRepository.saveAll(taxpayers);
    }
}
