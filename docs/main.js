// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

import { dotnet } from './dotnet.js'
import * as boot from './ts/js/boot.js'

const { setModuleImports, getAssemblyExports, getConfig } = await dotnet
    .withDiagnosticTracing(false)
    .withApplicationArgumentsFromQuery()
    .create();

const config = getConfig();
const exports = await getAssemblyExports(config.mainAssemblyName);
const text = exports.MyClass.Greeting();
console.log(text);

boot.setUpdateState(async function (requestJson) {
    const response = await exports.CodexApplicationExports.UpdateState(requestJson);
    var responseData = JSON.parse(response);
    return responseData;
});

onCodexAppStart(boot.codexClient);
await dotnet.run();