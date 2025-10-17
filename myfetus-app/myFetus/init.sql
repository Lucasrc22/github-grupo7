-- =====================================================
-- 🧠 BANCO DE DADOS - MyFetus
-- Criação e inicialização das tabelas principais
-- =====================================================

-- =====================================================
-- TABELA USERS (resumo para integridade relacional)
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  birthdate DATE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA PREGNANTS (completo + trigger de atualização)
-- =====================================================
CREATE TABLE IF NOT EXISTS pregnants (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    altura DOUBLE PRECISION,
    peso_pregestacional DOUBLE PRECISION,
    peso_atual DOUBLE PRECISION,

    antecedentes_diabetes BOOLEAN,
    antecedentes_hipertensao BOOLEAN,
    antecedentes_gemelar BOOLEAN,
    antecedentes_outros BOOLEAN,
    antecedentes_texto TEXT,

    gestacao_partos INTEGER,
    gestacao_vaginal INTEGER,
    gestacao_cesarea INTEGER,
    gestacao_bebe_maior_45 BOOLEAN,
    gestacao_bebe_maior_25 BOOLEAN,
    gestacao_eclampsia_pre_eclampsia BOOLEAN,
    gestacao_gestas BOOLEAN,
    gestacao_abortos INTEGER,
    gestacao_mais_tres_abortos BOOLEAN,
    gestacao_nascidos_vivos INTEGER,
    gestacao_nascidos_mortos INTEGER,
    gestacao_vivem INTEGER,
    gestacao_mortos_primeira_semana INTEGER,
    gestacao_mortos_depois_primeira_semana INTEGER,
    gestacao_final_gestacao_anterior_1ano BOOLEAN,

    antecedentes_clinicos_diabetes BOOLEAN,
    antecedentes_clinicos_infeccao_urinaria BOOLEAN,
    antecedentes_clinicos_infertilidade BOOLEAN,
    antecedentes_clinicos_dific_amamentacao BOOLEAN,
    antecedentes_clinicos_cardiopatia BOOLEAN,
    antecedentes_clinicos_tromboembolismo BOOLEAN,
    antecedentes_clinicos_hipertensao_arterial BOOLEAN,
    antecedentes_clinicos_cirur_per_uterina BOOLEAN,
    antecedentes_clinicos_cirurgia BOOLEAN,
    antecedentes_clinicos_outros BOOLEAN,
    antecedentes_clinicos_outros_texto TEXT,

    gestacao_atual_fumante BOOLEAN,
    gestacao_atual_quant_cigarros INTEGER,
    gestacao_atual_alcool BOOLEAN,
    gestacao_atual_outras_drogas BOOLEAN,
    gestacao_atual_hiv_aids BOOLEAN,
    gestacao_atual_sifilis BOOLEAN,
    gestacao_atual_toxoplasmose BOOLEAN,
    gestacao_atual_infeccao_urinaria BOOLEAN,
    gestacao_atual_anemia BOOLEAN,
    gestacao_atual_inc_istmocervical BOOLEAN,
    gestacao_atual_ameaca_parto_premat BOOLEAN,
    gestacao_atual_imuniz_rh BOOLEAN,
    gestacao_atual_oligo_polidramio BOOLEAN,
    gestacao_atual_rut_prem_membrana BOOLEAN,
    gestacao_atual_ciur BOOLEAN,
    gestacao_atual_pos_datismo BOOLEAN,
    gestacao_atual_febre BOOLEAN,
    gestacao_atual_hipertensao_arterial BOOLEAN,
    gestacao_atual_pre_eclamp_eclamp BOOLEAN,
    gestacao_atual_cardiopatia BOOLEAN,
    gestacao_atual_diabete_gestacional BOOLEAN,
    gestacao_atual_uso_insulina BOOLEAN,
    gestacao_atual_hemorragia_1trim BOOLEAN,
    gestacao_atual_hemorragia_2trim BOOLEAN,
    gestacao_atual_hemorragia_3trim BOOLEAN,

    exantema_rash BOOLEAN,

    vacina_antitetanica BOOLEAN,
    vacina_antitetanica_1dose TIMESTAMP,
    vacina_antitetanica_2dose TIMESTAMP,
    vacina_antitetanica_dtpa TIMESTAMP,
    vacina_hepatite_b BOOLEAN,
    vacina_hepatite_b_1dose TIMESTAMP,
    vacina_hepatite_b_2dose TIMESTAMP,
    vacina_hepatite_b_3dose TIMESTAMP,
    vacina_influenza BOOLEAN,
    vacina_influenza_1dose TIMESTAMP,
    vacina_covid19 BOOLEAN,
    vacina_covid19_1dose TIMESTAMP,
    vacina_covid19_2dose TIMESTAMP
);

-- =====================================================
-- TRIGGER: Atualiza automaticamente o campo updated_at
-- =====================================================
CREATE OR REPLACE FUNCTION update_pregnant_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_pregnant_updated_at
BEFORE UPDATE ON pregnants
FOR EACH ROW
EXECUTE FUNCTION update_pregnant_updated_at();

-- =====================================================
-- EXEMPLO DE INSERÇÃO INICIAL
-- =====================================================

INSERT INTO users (name, email, password, birthdate, role)
VALUES ('Usuária de Teste', 'teste@example.com', 'senha123', '1995-06-20', 'user');

INSERT INTO pregnants (
    user_id, altura, peso_pregestacional, peso_atual,
    antecedentes_diabetes, antecedentes_hipertensao, gestacao_partos, gestacao_abortos,
    gestacao_atual_fumante, gestacao_atual_alcool, vacina_antitetanica, vacina_hepatite_b, vacina_covid19
)
VALUES (
    1, 1.65, 68.5, 70.2,
    FALSE, FALSE, 1, 0,
    FALSE, TRUE, TRUE, TRUE, TRUE
);
