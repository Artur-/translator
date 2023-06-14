package org.vaadin.artur.translator;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

import com.github.javaparser.StaticJavaParser;
import com.github.javaparser.ast.CompilationUnit;
import com.github.javaparser.ast.ImportDeclaration;
import com.github.javaparser.printer.lexicalpreservation.LexicalPreservingPrinter;
import org.apache.commons.io.IOUtils;

public class Util {
    public static boolean hasImport(CompilationUnit cu, String className) {
        for (ImportDeclaration importDecl : cu.getImports()) {
            if (importDecl.getNameAsString().equals(className)) {
                return true;
            }
        }
        return false;
    }

    protected static String readFile(File file) throws IOException {
        try (FileInputStream stream = new FileInputStream(file)) {
            return IOUtils.toString(stream, StandardCharsets.UTF_8);
        }
    }
    protected static CompilationUnit parseSource(String source) {
        return LexicalPreservingPrinter.setup(StaticJavaParser.parse(source));
    }

}
