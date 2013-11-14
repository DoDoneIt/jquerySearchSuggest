<?php

		/**
			数据库连接部分
		**/
        $nick = $this->_getParam('nick');
        $rows = array();
        if (!empty($_POST["nick"])) {
            $nick = trim($nick);
            /*
            *select * from table where XXX  like "%$nick%";
            * mysql_fetch_array
            *	$rows[][]
            */
            
        }
        echo json_encode($rows);

?>
