"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface BaseInfo {
  name: string;
  prefix: string;
  regex: RegExp;
}

interface BasesType {
  [key: string]: BaseInfo;
}

const bases: BasesType = {
  "2": {
    name: "Binary",
    prefix: "0b",
    regex: /^[01]+$/
  },
  "8": {
    name: "Octal",
    prefix: "0o",
    regex: /^[0-7]+$/
  },
  "10": {
    name: "Decimal",
    prefix: "",
    regex: /^[0-9]+$/
  },
  "16": {
    name: "Hexadecimal",
    prefix: "0x",
    regex: /^[0-9A-Fa-f]+$/
  }
};

export default function BinaryConversion() {
  const [inputBase, setInputBase] = useState("10");
  const [outputBase, setOutputBase] = useState("2");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleConvert = () => {
    setError("");
    setResult("");

    if (!value) {
      setError("Please enter a value to convert");
      return;
    }

    try {
      // Validate the input against the selected base's regex
      if (!bases[inputBase].regex.test(value)) {
        setError(`Invalid character for ${bases[inputBase].name}`);
        return;
      }

      // Convert input to decimal first
      const decimal = parseInt(value, parseInt(inputBase));
      
      // Then convert decimal to target base
      const converted = decimal.toString(parseInt(outputBase));
      
      setResult(bases[outputBase].prefix + converted);
    } catch {
      setError("Invalid conversion");
    }
  };

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Number Base Converter</CardTitle>
          <CardDescription>
            Convert numbers between different bases (Binary, Octal, Decimal, Hexadecimal)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>From Base</Label>
              <Select value={inputBase} onValueChange={setInputBase}>
                <SelectTrigger>
                  <SelectValue>{bases[inputBase].name}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(bases).map(([base, info]) => (
                    <SelectItem key={base} value={base}>
                      {info.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder={`Enter ${bases[inputBase].name} number`}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>To Base</Label>
              <Select value={outputBase} onValueChange={setOutputBase}>
                <SelectTrigger>
                  <SelectValue>{bases[outputBase].name}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(bases).map(([base, info]) => (
                    <SelectItem key={base} value={base}>
                      {info.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="Result"
                value={result}
                readOnly
                className="bg-muted"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <Button onClick={handleConvert} className="w-full">
            Convert
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 