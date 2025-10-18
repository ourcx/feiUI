import { expect, test } from 'vitest'

test('example test', () => {
  const name = 'World'
  expect(`Hello, ${name}!`).toBe('Hello, World!')
  expect(1 + 1).toBe(2)
  expect(2 + 1).not.toBe(4)
})

test("test to be true or false", () => {
  const isTrue = true;
  const isFalse = false;

  expect(isTrue).toBe(true);
  expect(isFalse).toBe(false);

  expect(1).toBeTruthy();
  expect(0).toBeFalsy();
});


test("test to be null or undefined", () => {
  const value = null;
  const anotherValue = undefined;

  expect(value).toBeNull();
  expect(anotherValue).toBeUndefined();

  expect(anotherValue).not.toBeDefined();
});

test("test to be greater than or less than", () => {
  const a = 5;
  const b = 10;

  expect(a).toBeLessThan(b);
  expect(b).toBeGreaterThan(a);

  expect(3).toBeLessThanOrEqual(3);
  expect(4).toBeGreaterThanOrEqual(4);
});

test("test number",() => {
    expect(5).toBeGreaterThan(3);
    //5比3大
    expect(2).toBeLessThan(3);
    //2比3小
});

test("test string", () => {
  const str = "Hello, World!";
  expect(str).toContain("World");
  expect(str).toMatch(/Hello/);
  expect(str.length).toBe(13);
});

