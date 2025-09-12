#!/bin/bash
# Nome do script: generate-code-coverage.sh
# Descrição: Realiza build, executa testes unitários do projeto e gera o relório de cobertura de código.
# pré-requisito: Requer permissão de execução. Execute o comando: chmod +x generate-code-coverage.sh
# Autor: Tiago Amaral
# Data: 2025-09-08

rm -rf coverage docs && 
ng test --code-coverage   