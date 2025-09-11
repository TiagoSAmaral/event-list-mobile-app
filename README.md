<!--
* README.md 
* event-list 
*
* Created by Tiago Amaral on 05/09/2025. 
* Copyright ©2024 Tiago Amaral. All rights reserved.
-->

# 🎯 Desafio Técnico – Desenvolvedor Mobile (Pleno/Sênior)

Este repositório contém o desafio técnico de desenvolvimento de um aplicativo híbrido em **Ionic + Angular**, consumindo uma **API em .NET 6/7 Web API**, com foco em código limpo, escalável, reutilizável e aplicando boas práticas de arquitetura.

---

## 🔹 Frontend (Ionic + Angular)

### 📍 Objetivos
- Criar app com **três telas**:
    - Lista de Eventos.
    - Detalhes do Evento.
    - Cadastro de Evento.
- Consumir endpoints da API para listar, detalhar e cadastrar.
- Usar boas práticas de modularização.
- Implementar **validações no formulário**.
- Usar **RxJS/Observables** na integração com a API.

### ✅ Checklist de Metas
- [X] Criar projeto Ionic + Angular.
- [x] Configurar módulos e rotas.
- [X] Implementar tela **Lista de Eventos** (GET /api/eventos).
- [x] Implementar tela **Detalhes do Evento** (GET /api/eventos/{id}).
- [X] Implementar tela **Cadastro de Evento** (POST /api/eventos).
- [X] Implementar tela **Delete de Evento** (DELETE /api/eventos). -> Adicional
- [X] Aplicar validações no formulário.
- [X] Usar RxJS/Observables para consumo de API.
- [x] Testar fluxo completo (listar → detalhar → cadastrar → deletar).

## 🌟 Diferenciais (opcionais, mas recomendados)
- [x] Testes unitários (`Jasmine/Karma` para frontend).
- [x] Uso de interceptors no Ionic para tratar erros de API.
- [ ] Publicar frontend no **TestFlight** (iOS) ou **APK Android**.

## 🚀 Entrega
- Repositório Git (GitHub/GitLab/Bitbucket) contendo:
- Código-font``e do **app (Ionic)**.
- Código-fonte da **API (.NET Web API)**.
- Instruções claras no `README.md` de cada stack para rodar o projeto.
``

## 📝 Avaliação
O que será analisado:
- Organização do código e estrutura de pastas.
- Uso de boas práticas (SOLID, Clean Code, modularização).
- Clareza nas instruções e documentação.
- Qualidade da integração **API ↔ Mobile**.
- Criatividade na solução.

📅 **Prazo sugerido**: 3 a 5 dias úteis.