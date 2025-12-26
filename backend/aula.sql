-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 26/12/2025 às 23:53
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `aula`
--

DELIMITER $$
--
-- Procedimentos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `atualizarCliente` (IN `p_id` INT, IN `p_nome` VARCHAR(100), IN `p_email` VARCHAR(100), IN `p_telefone` VARCHAR(20), IN `p_endereco` VARCHAR(255))   BEGIN
    UPDATE cliente
    SET nome = p_nome,
        email = p_email,
        telefone = p_telefone,
        endereco = p_endereco
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `consultarClientes` (IN `p_nome` VARCHAR(100))   BEGIN
    SELECT *
    FROM cliente
    WHERE nome LIKE CONCAT('%', p_nome, '%');
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deletarCliente` (IN `clienteID` INT)   BEGIN
    DELETE FROM cliente WHERE id = clienteID;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `inserirCliente` (IN `p_nome` VARCHAR(100), IN `p_email` VARCHAR(100), IN `p_telefone` VARCHAR(20), IN `p_endereco` VARCHAR(255))   BEGIN
    INSERT INTO cliente (nome, email, telefone, endereco)
    VALUES (p_nome, p_email, p_telefone, p_endereco);
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura para tabela `cliente`
--

CREATE TABLE `cliente` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `endereco` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
