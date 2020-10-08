<?php

class EDB
{
    public $path;
    public $password;
    public $database;
    public $content;
    public $info;
    function __construct($path, $password = "none")
    {
        $this->path = $path;
        $this->password = $password;
        $this->database = $this->readDB($path, $password);
        $this->content = $this->database["content"];
        $this->info = $this->database["info"];
    }

    public function readDB($path, $password = "none")
    {
        $file = fopen($path, "r");
        $file = file_get_contents($path);
        $db = [
            "info" => [],
            "content" => [],
        ];
        $file = str_split($file);
        $l_count = 0;
        $in = "root";
        $inSTR = false;
        $inArray = false;
        for ($i = 0; $i < count($file); $i++) {
            $element = $file[$i];

            if (!$inSTR && $element == "|") {
                $l_count++;
            } else {
                if ($l_count == 1) {
                    array_push($db["info"], ["", ""]);
                    $in = "info";
                } else if ($l_count == 3) {
                    array_push($db["content"], ["", ["", ""]]);
                    $in = "content";
                }
                $l_count = 0;
                if ($in == "info") {
                    if ($element == ":") {
                        $in = "info:1";
                    } else {
                        if ($element == '"') {
                            $inSTR = !$inSTR;
                        } else {
                            if ($inSTR || $element != " ") {
                                $db["info"][count($db["info"]) - 1][0] .= $element;
                            }
                        }
                    }
                } else if ($in == "info:1") {
                    if ($element == '"') {
                        $inSTR = !$inSTR;
                    } else {
                        if ($inSTR) {
                            $db["info"][count($db["info"]) - 1][1] .= $element;
                        }
                    }
                } else if ($in == "content") {
                    if ($element == "\n" || $element == ";" || $element == "\r") {
                        $in = "content:1";
                    } else if ($element != "\n" || $element != ";" || $element != "\r") {
                        $db["content"][count($db["content"]) - 1][0] .= $element;
                    }
                } else if ($in == "content:1") {
                    if (!$inSTR && $element == ":") {
                        $in = "content:1:1";
                    } else if ($element == '"') {
                        $inSTR = !$inSTR;
                    } else {
                        if ($inSTR) {
                            $db["content"][count($db["content"]) - 1][count($db["content"][count($db["content"]) - 1]) - 1][0] .= $element;
                        }
                    }
                } else if ($in == "content:1:1") {
                    if (!$inSTR && ($element == "\n" || $element == ";" || $element == "\r")) {
                        array_push($db["content"][count($db["content"]) - 1], ["", ""]);
                        $in = "content:1";
                    } else {
                        if ($element == '"') {
                            $inSTR = !$inSTR;
                        } else if ($element == "[" || $element == "]") {

                            if ($element == "[") {
                                $inArray = true;
                            } else {
                                $inArray = false;
                            }
                            if ($inArray) {
                                $db["content"][count($db["content"]) - 1][count($db["content"][count($db["content"]) - 1]) - 1][1] = [""];
                            }
                        } else if ($inArray) {
                            if ($element == "," && !$inSTR) {
                                array_push($db["content"][count($db["content"]) - 1][count($db["content"][count($db["content"]) - 1]) - 1][1], "");
                            } else if ($element != " " || $inSTR) {
                                $db["content"][count($db["content"]) - 1][count($db["content"][count($db["content"]) - 1]) - 1][1][count($db["content"][count($db["content"]) - 1][count($db["content"][count($db["content"]) - 1]) - 1][1]) - 1] .= $element;
                                if (is_numeric($element) && !$inSTR) {
                                    $db["content"][count($db["content"]) - 1][count($db["content"][count($db["content"]) - 1]) - 1][1][count($db["content"][count($db["content"]) - 1][count($db["content"][count($db["content"]) - 1]) - 1][1]) - 1] = intval($db["content"][count($db["content"]) - 1][count($db["content"][count($db["content"]) - 1]) - 1][1][count($db["content"][count($db["content"]) - 1][count($db["content"][count($db["content"]) - 1]) - 1][1]) - 1]);
                                }
                            }
                        } else if ($element != " " || $inSTR) {
                            $db["content"][count($db["content"]) - 1][count($db["content"][count($db["content"]) - 1]) - 1][1] .= $element;
                            if (is_numeric($element) && !$inSTR) {
                                $db["content"][count($db["content"]) - 1][count($db["content"][count($db["content"]) - 1]) - 1][1] = intval($db["content"][count($db["content"]) - 1][count($db["content"][count($db["content"]) - 1]) - 1][1]);
                            }
                        }
                    }
                }
            }
        }
        for ($i = 0; $i < count($db["content"]); $i++) {
            for ($j = 1; $j < count($db["content"][$i]); $j++) {
                if ($db["content"][$i][$j] == ["", ""]) array_splice($db["content"][$i], $j);
            }
        }
        $x = $this->findAsObj($db["info"], "password");
        if ($x && $password == $x) {
            return $db;
        }
        return false;
    }

    public function formatAsObj()
    {
        $db = $this->database;
        $newDB = [
            "info" => [],
            "content" => []
        ];
        for ($i = 0; $i < count($db["info"]); $i++) {
            $newDB["info"][$db["info"][$i][0]] = $db["info"][$i][1];
        }
        for ($i = 0; $i < count($db["content"]); $i++) {
            $newDB["content"][$db["content"][$i][0]] = [];
            for ($j = 1; $j < count($db["content"][$i]); $j++) {
                $newDB["content"][$db["content"][$i][0]][$db["content"][$i][$j][0]] = $db["content"][$i][$j][1];
            }
        }
        return $newDB;
    }

    public function addinDB($table, $delete = false)
    {

        $path = $this->path;
        $password = $this->password;
        $table[0] = str_replace('"', "''", $table[0]);
        for ($i = 1; $i < count($table); $i++) {
            $element = $table[$i][1];
            if (is_array($element)) {
                for ($j = 0; $j < count($element); $j++) {
                    $string = $element[$j];
                    if (is_string($string)) {
                        $string = str_replace('"', "''", $string);
                    }
                    $table[$i][1][$j] = $string;
                }
            } else if (is_string($element)) {
                $string = $element;
                if (is_string($string)) {
                    $string = str_replace('"', "''", $string);
                }
                $table[$i][1] = $string;
            }
        }
        if ($this->readDB($path, $password)) {
            $db = $this->readDB($path, $password);
            file_put_contents($path, "");
            $fdb = fopen($path, "a+");
            $rewrite = false;
            for ($i = 0; $i < count($db["info"]); $i++) {
                fwrite($fdb, '|' . $db["info"][$i][0] . ' : "' . $db["info"][$i][1] . '"' . "\n");
            }
            $db = $db["content"];
            for ($i = 0; $i < count($db); $i++) {
                if ($db[$i][0] == $table[0]) {
                    $db[$i] = $table;
                    $rewrite = true;
                }
                fwrite($fdb, "\n|||" . $db[$i][0] . "\n");
                for ($j = 1; $j < count($db[$i]); $j++) {
                    $value = $db[$i][$j][1];
                    if (is_numeric($value) && !is_string($value)) {
                        fwrite($fdb, '    "' . $db[$i][$j][0] . '" : ' . $db[$i][$j][1] . '' . "\n");
                    } else if (is_array($value)) {
                        $content = '    "' . $db[$i][$j][0] . '" : [';
                        for ($k = 0; $k < count($db[$i][$j][1]); $k++) {
                            $element = $db[$i][$j][1][$k];
                            if (is_numeric($element)) {
                                $content .= $element;
                            } else {
                                $content .= '"' . $element . '"';
                            }
                            if (isset($db[$i][$j][1][$k + 1])) {
                                $content .= ", ";
                            }
                        }
                        $content .= "]";
                        fwrite($fdb, $content . "\n");
                    } else {
                        fwrite($fdb, '    "' . $db[$i][$j][0] . '" : "' . $db[$i][$j][1] . '"' . "\n");
                    }
                }
            }
            if (!$rewrite) {
                fwrite($fdb, "\n|||" . $table[0] . "\n");
                for ($i = 1; $i < count($table); $i++) {
                    if (isset($value) && is_numeric($value)) {
                        fwrite($fdb, '    "' . $table[$i][0] . '" : ' . $table[$i][1] . '' . "\n");
                    } else if (is_array($table[$i][1])) {
                        $content = '    "' . $table[$i][0] . '" : [';
                        for ($k = 0; $k < count($table[$i][1]); $k++) {
                            $element = $table[$i][1][$k];
                            if (is_numeric($element)) {
                                $content .= $element;
                            } else {
                                $content .= '"' . $element . '"';
                            }
                            if (isset($table[$i][1][$k + 1])) {
                                $content .= ", ";
                            }
                        }
                        $content .= "]";
                        fwrite($fdb, $content . "\n");
                    } else {
                        fwrite($fdb, '    "' . $table[$i][0] . '" : "' . $table[$i][1] . '"' . "\n");
                    }
                }
            }
            return true;
        } else {
            return false;
        }
    }

    public function delete($table)
    {
        $path = $this->path;
        $password = $this->password;

        $db = $this->readDB($path, $password);
        
        file_put_contents($path, "");
        $fdb = fopen($path, "a+");
        fwrite($fdb, '|name : "'.$db["info"][0][1].'"'."\n".'|password : "'.$db["info"][1][1].'"'."\n\n");
        
        for ($i=0; $i < count($db["content"]); $i++) { 
            $tb = $db["content"][$i];
            if ($tb[0] != $table) {
                $this->addinDB($tb);
            }
        }
    }

    public function findAsObj($array, $key)
    {
        for ($i = 0; $i < count($array); $i++) {
            if ($array[$i][0] == $key) {
                return $array[$i][1];
            }
        }
        return false;
    }
}

function formatRivets($string)
{
    return str_replace('"', "''", $string);
}


function includeJS($toRoot)
{ ?>

    <script>
        toRoot = "<?php echo $toRoot ?>";
    </script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="<?php echo $toRoot ?>edb/functions.js"></script>
<?php }


function createDB($name, $path, $table, $password = "none")
{
    $f = fopen($path . "/" . $name . ".edb", "a+");
    $text = "";
    for ($i = 1; $i < count($table); $i++) {
        $element = $table[$i];
        $text .= `"$element[0]" : `;
        if (is_array($element[1])) {
            $text .= "[";
            for ($j = 0; $j < count($element[1]); $j++) {
                $text .= `"$element[1][$j]"`;
                if (isset($element[1][$j + 1])) {
                    $text .= ",";
                }
                $text .= "] \n";
            }
        } else if (!is_string($element[1]) && is_numeric($element[1])) {
            $text .= $element[1] . "\n";
        } else {
            $text .= `"$element[1]" \n`;
        }
    }
    fwrite(
        $f,
        '|name : "' . $name . '"' . "\n" .
            '|password : "' . $password . '"' . "\n\n" .
            '|||' . $table[0] . "\n" .
            '    "foo" : "bar"' . "\n"
    );
    $db = new EDB($path . "/" . $name . ".edb", $password);
    $db->addinDB($table);
    return $db;
}


function inStr($x, $y)
{
    $is = false;
    if (is_array($x)) {
        for ($i = 0; $i < count($x); $i++) {
            if (str_replace($x[$i], "", $y) != $y) {
                $is = true;
                break;
            }
        }
    } else {
        if (str_replace($x, "", $y) != $y) {
            $is = true;
        }
    }
    return $is;
}
