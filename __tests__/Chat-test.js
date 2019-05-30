import React from 'react';
import 'react-native';
import Chat from "../screens/Chat";
import renderer from 'react-test-renderer';

test("Home snapshot", () => {
    const snap = renderer.create(
        <Chat />
    ).toJSON();
expect(snap).toMatchSnapshot()
})