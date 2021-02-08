import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;{{each imports}}
import {{$value}};{{/each}}

/**
 * @author jmvn-cli
 **/
@TableName(value = "{{@tableName}}", autoResultMap = true)
public class {{@className}} implements Serializable {

    private static final long serialVersionUID = 1L;
    {{each fields}}
   /**
    * {{$value.comment}}
    **/{{if($value.primary)}}
    @TableId(value = "{{$value.name}}", type = IdType.ASSIGN_ID)
    public {{$value.javaType}} <%=$imports.camelCase($value.name)%>;{{else}}
    public {{$value.javaType}} <%=$imports.camelCase($value.name)%>;{{/if}}
    {{/each}}
   {{each fields}}
   /**
    * @param <%=$imports.camelCase($value.name)%> {{$value.comment}}
    **/
    public void set<%=$imports.fistUpper($imports.camelCase($value.name))%>({{$value.javaType}} <%=$imports.camelCase($value.name)%>){
        this.<%=$imports.camelCase($value.name)%> = <%=$imports.camelCase($value.name)%>;
    }

   /**
    * @return {{$value.javaType}} {{$value.comment}}
    **/
    public {{$value.javaType}} get<%=$imports.fistUpper($imports.camelCase($value.name))%>(){
        return <%=$imports.camelCase($value.name)%>
    }
   {{/each}}
    @Override
    public String toString() {
        return "{{@className}}{" +{{each fields}}
          ",<%=$imports.camelCase($value.name)%>=" + this.<%=$imports.camelCase($value.name)%> + {{/each}}
        "}";
    }
}
