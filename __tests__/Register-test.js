import React from 'react';
import 'react-native';
import Register from "../screens/Register";
import renderer from 'react-test-renderer';

test("Home snapshot", () => {
    const snap = renderer.create(
        <Register />
    ).toJSON();
expect(snap).toMatchSnapshot()
})