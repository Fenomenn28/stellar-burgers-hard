
const BASE_URL = 'https://norma.nomoreparties.space/api';

const SELECTORS = {
  filling: "[data-cy='643d69a5c3f7b9001cfa0941']",
  bun: "[data-cy='643d69a5c3f7b9001cfa093c']",
  constructor: "[data-cy='constructor']",
  modal: "[data-cy='modal']",
  overlay: '.RuQycGaRTQNbnIEC5d3Y',
  orderButton: '[data-cy="order-button"]',
};

beforeEach(() => {
  cy.intercept('GET', `${BASE_URL}/ingredients`, { fixture: "ingredients.json" });
  cy.intercept('GET', `${BASE_URL}/auth/user`, { fixture: "user.json" });
  cy.intercept('POST', `${BASE_URL}/orders`, { fixture: "responseOrder.json" });
  
  cy.visit('http://localhost:4000/');
  cy.viewport(1440, 800);
});

describe('Взаимодействие с конструктором', () => {
  it('добавляет в конструктор начинку', () => {
    cy.get(SELECTORS.filling).children('button').click();
    cy.get(SELECTORS.constructor).children('ul').children('li')
      .contains('Биокотлета из марсианской Магнолии').should('exist');
  });

  it('добавляет булочку в конструктор', () => {
    cy.get(SELECTORS.bun).children('button').click();
    cy.get('[data-cy="bun-top"]').contains('Краторная булка N-200i').should('exist');
    cy.get('[data-cy="bun-button"]').contains('Краторная булка N-200i').should('exist');
  });
});

describe('Функциональность модального окна', () => {
  it('открывает модальное окно ингредиентов', () => {
    cy.get(SELECTORS.filling).click();
    cy.get(SELECTORS.modal).contains('Биокотлета из марсианской Магнолии').should('exist');
  });

  it('закрывает модальное окно с помощью кнопки "X"', () => {
    cy.get(SELECTORS.filling).click();
    cy.get(SELECTORS.modal).find('button').click();
    cy.get(SELECTORS.modal).should('not.exist');
  });

  it('закрывает модальное окно с помощью overlay', () => {
    cy.get(SELECTORS.filling).click();
    cy.get(SELECTORS.overlay).click({ force: true });
    cy.get(SELECTORS.modal).should('not.exist');
  });
});

describe('Тест по созданию заказа', () => {
  beforeEach(() => {
    window.localStorage.setItem('refreshToken', 'alexRefresh');
    cy.setCookie('accessToken', 'alexAccess');
  });

  afterEach(() => {
    window.localStorage.clear();
    cy.clearAllCookies();
  });

  it('Создает успешный заказ', () => {
    cy.get(SELECTORS.filling).children('button').click();
    cy.get(SELECTORS.bun).children('button').click();
    cy.get(SELECTORS.orderButton).click();
    
    cy.get(SELECTORS.modal).contains('54908').should('exist');
    cy.get(SELECTORS.modal).find('button').click();
    cy.get(SELECTORS.modal).should('not.exist');
    cy.get(SELECTORS.constructor).children('ul').children('li').should('not.exist');
  });
});
